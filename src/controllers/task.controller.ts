import type { Request, Response } from "express";
import type { Task } from "@prisma/client";
import type { AuthRequest } from "../middlewares/auth.middleware.js";
import { TaskService } from "../services/task.service.js";
import { actionHistoryService } from "../services/actionHistory.service.js";
import { shemaupdate, schemaUpdateEtat } from "../validator/task.js";

const taskService = new TaskService();

export async function getTasksbyUser(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    const page = parseInt(String(req.query.page || '1'), 10) || 1;
    const limit = parseInt(String(req.query.limit || '10'), 10) || 10;

    const result = await taskService.findUserTasksPaginated(Number(req.user.id), page, limit);
    const totalPages = Math.ceil(result.total / limit);

    // Ajouter la durée à chaque tâche
    let dataWithDuration = result.data.map(task => ({
      ...task,
      duration: taskService.calculateDuration(task.startDate, task.endDate)
    }));

    // Vérifier et auto-compléter les tâches expirées
    dataWithDuration = await taskService.autoCompleteExpiredTasks(dataWithDuration);

    res.status(200).json({ data: dataWithDuration, page, limit, total: result.total, totalPages });
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches:", error);
    res.status(500).json({
      message: "Erreur interne du serveur",
      error: error instanceof Error ? error.message : "Erreur inconnue"
    });
  }
}



export async function getAllTasks(req: AuthRequest, res: Response) {
  try {
    const page = parseInt(String(req.query.page || '1'), 10) || 1;
    const limit = parseInt(String(req.query.limit || '10'), 10) || 10;

    const result = await taskService.findAllPaginated(page, limit);
    const totalPages = Math.ceil(result.total / limit);

    // Ajouter la durée à chaque tâche
    let dataWithDuration = result.data.map(task => ({
      ...task,
      duration: taskService.calculateDuration(task.startDate, task.endDate)
    }));

    // Vérifier et auto-compléter les tâches expirées
    dataWithDuration = await taskService.autoCompleteExpiredTasks(dataWithDuration);

    res.status(200).json({ data: dataWithDuration, page, limit, total: result.total, totalPages });
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches:", error);
    res.status(500).json({
      message: "Erreur interne du serveur",
      error: error instanceof Error ? error.message : "Erreur inconnue"
    });
  }
}





export async function getTasksById(req: Request<{ id: string }>, res: Response) {
  const idParam = req.params.id;
  if (!idParam) return res.status(400).json({ message: "id required" });

  const id = parseInt(idParam, 10);
  if (Number.isNaN(id)) return res.status(400).json({ message: "id must be a number" });

  let task = await taskService.findById(id);
  if (task) {
    // Record READ action if user present
    const maybeAuth = req as AuthRequest;
    if (maybeAuth.user) {
      try {
        await actionHistoryService.record({ userId: Number(maybeAuth.user.id), taskId: task.id, action: "READ", details: `Viewed task ${task.id}` });
      } catch (e) {
        console.error("Failed to record history (READ):", e);
      }
    }

    // Calculer la durée si les dates sont présentes
    const duration = taskService.calculateDuration(task.startDate, task.endDate);

    // Vérifier et auto-compléter si nécessaire
    const tasksWithAutoComplete = await taskService.autoCompleteExpiredTasks([{ ...task, duration }]);
    task = tasksWithAutoComplete[0];

    res.status(200).json(task);
  } else {
    res.status(404).json({ message: "Classe not found" });
  }
}



export async function createTasks(req: AuthRequest, res: Response) {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Not authenticated" });

  // Type assertion pour les fichiers
  const multerReq = req as AuthRequest & { files?: { photo?: Express.Multer.File[], audio?: Express.Multer.File[] } };

  const photoPath = multerReq.files?.photo?.[0] ? `/uploads/${multerReq.files.photo[0].filename}` : undefined;
  const audioPath = multerReq.files?.audio?.[0] ? `/uploads/${multerReq.files.audio[0].filename}` : undefined;

  const payload = {
    ...req.body,
    userId: user.id,
    ...(photoPath && { photo: photoPath }),
    ...(audioPath && { audio: audioPath })
  };

  const created = await taskService.create(payload);
  res.status(201).json(created);
}



export async function updateTasks(req: AuthRequest, res: Response) {

  const idParam = req.params.id;
if (!idParam) return res.status(400).json({ message: "id required" });

const id = parseInt(idParam, 10);
  if (Number.isNaN(id)) return res.status(400).json({ message: "id must be a number" });

  try {
    const multerReq = req as AuthRequest & { files?: { photo?: Express.Multer.File[], audio?: Express.Multer.File[] } };

    const photoPath = multerReq.files?.photo?.[0] ? `/uploads/${multerReq.files.photo[0].filename}` : undefined;
    const audioPath = multerReq.files?.audio?.[0] ? `/uploads/${multerReq.files.audio[0].filename}` : undefined;

    const payload = {
      ...req.body,
      ...(photoPath && { photo: photoPath }),
      ...(audioPath && { audio: audioPath })
    };

    const updated = await taskService.update(id, payload);

    // Enregistrer l'action dans l'historique
    try {
      if (req.user) {
        await actionHistoryService.record({
          userId: req.user.id,
          taskId: updated.id,
          action: "UPDATE",
          details: `Updated task ${updated.id}`
        });
      }
    } catch (e) {
      console.error("Failed to record history (UPDATE):", e);
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(404).json({ message: "Task not found" });
  }
}


export async function deleteTasks(req: AuthRequest & Request<{ id: string }>, res: Response) {
  const idParam = req.params.id;
  if (!idParam) return res.status(400).json({ message: "id required" });

  const id = parseInt(idParam, 10);
  if (Number.isNaN(id)) return res.status(400).json({ message: "id must be a number" });

  try {
    await taskService.delete(id);
    // Record DELETE action
    try {
      if (req.user) {
        await actionHistoryService.record({ userId: Number(req.user.id), taskId: id, action: "DELETE", details: `Deleted task ${id}` });
      }
    } catch (e) {
      console.error("Failed to record history (DELETE):", e);
    }

    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: "Classe not found" });
  }
}

export async function Addpermission(req: AuthRequest & Request<{ id: string }>, res: Response) {
  const taskId = Number(req.params.id);
  const verif = shemaupdate.safeParse(req.body);
  if (!verif.success) return res.status(401).json({ message: "erreur" });
  
  const { userId } = verif.data;
  const up = await taskService.addPermission(taskId, userId);

  return res.status(200).json({
    message: "réussi",
    data: up
  });
}
    

export async function updateEtat(req: AuthRequest & Request<{ id: string }>, res: Response) {
  const idParam = req.params.id;
  if (!idParam) return res.status(400).json({ message: "id required" });

  const id = parseInt(idParam, 10);
  if (Number.isNaN(id)) return res.status(400).json({ message: "id must be a number" });

  const validation = schemaUpdateEtat.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      message: "Erreur de validation",
      errors: validation.error.format(),
    });
  }

  try {
    const { etat } = validation.data;
    const updated = await taskService.updateEtat(id, etat);
    res.status(200).json({
      message: "État mis à jour avec succès",
      data: updated
    });
  } catch (err) {
    res.status(404).json({ message: "Tâche non trouvée" });
  }
}

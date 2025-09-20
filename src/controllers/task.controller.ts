import type { Request, Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware.js";
import { TaskService } from "../services/task.service.js";
import { shemaupdate } from "../validator/classe.validator.js";

const taskService = new TaskService();

export async function getAllClasses(req: Request, res: Response) {
  const tasks = await taskService.findAll();
  res.status(200).json(tasks);
}

export async function getClasseById(req: Request<{ id: string }>, res: Response) {
  const idParam = req.params.id;
  if (!idParam) return res.status(400).json({ message: "id required" });

  const id = parseInt(idParam, 10);
  if (Number.isNaN(id)) return res.status(400).json({ message: "id must be a number" });

  const task = await taskService.findById(id);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).json({ message: "Classe not found" });
  }
}

export async function createClasse(req: AuthRequest, res: Response) {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Not authenticated" });
  const photoPath = (req as any).file ? `/uploads/${(req as any).file.filename}` : undefined;

  const payload: any = { ...req.body, userId: user.id };
  if (photoPath) payload.photo = photoPath;

  const created = await taskService.create(payload);
  res.status(201).json(created);
}

export async function updateClasse(req: AuthRequest & Request<{ id: string }>, res: Response) {
  const idParam = req.params.id;
  if (!idParam) return res.status(400).json({ message: "id required" });

  const id = parseInt(idParam, 10);
  if (Number.isNaN(id)) return res.status(400).json({ message: "id must be a number" });

  try {
  const photoPath = (req as any).file ? `/uploads/${(req as any).file.filename}` : undefined;
  const payload: any = { ...req.body };
  if (photoPath) payload.photo = photoPath;

  const updated = await taskService.update(id, payload);
  res.status(200).json(updated);
  } catch (err) {
    res.status(404).json({ message: "Classe not found" });
  }
}   

export async function deleteClasse(req: AuthRequest & Request<{ id: string }>, res: Response) {
  const idParam = req.params.id;
  if (!idParam) return res.status(400).json({ message: "id required" });

  const id = parseInt(idParam, 10);
  if (Number.isNaN(id)) return res.status(400).json({ message: "id must be a number" });

  try {
    await taskService.delete(id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: "Classe not found" });
  }
}

   export  async  function Addpermission(req:AuthRequest,res:Response){
    const taskId = Number(req.params.id);
    const verif =shemaupdate.safeParse(req.body)
    if(!verif.success) return  res.status(401).json({message:"erreur"});
    const {userId}=verif.data;
    const up= await taskService.addPermission(taskId,userId);

    return res.status(200).json({
      messagge:"reussie",
      data:up
    })
  }



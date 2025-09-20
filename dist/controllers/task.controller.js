import { TaskService } from "../services/task.service.js";
import { shemaupdate } from "../validator/classe.validator.js";
const taskService = new TaskService();
export async function getAllClasses(req, res) {
    const tasks = await taskService.findAll();
    res.status(200).json(tasks);
}
export async function getClasseById(req, res) {
    const idParam = req.params.id;
    if (!idParam)
        return res.status(400).json({ message: "id required" });
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id))
        return res.status(400).json({ message: "id must be a number" });
    const task = await taskService.findById(id);
    if (task) {
        res.status(200).json(task);
    }
    else {
        res.status(404).json({ message: "Classe not found" });
    }
}
export async function createClasse(req, res) {
    const user = req.user;
    if (!user)
        return res.status(401).json({ message: "Not authenticated" });
    const photoPath = req.file ? `/uploads/${req.file.filename}` : undefined;
    const payload = { ...req.body, userId: user.id };
    if (photoPath)
        payload.photo = photoPath;
    const created = await taskService.create(payload);
    res.status(201).json(created);
}
export async function updateClasse(req, res) {
    const idParam = req.params.id;
    if (!idParam)
        return res.status(400).json({ message: "id required" });
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id))
        return res.status(400).json({ message: "id must be a number" });
    try {
        const photoPath = req.file ? `/uploads/${req.file.filename}` : undefined;
        const payload = { ...req.body };
        if (photoPath)
            payload.photo = photoPath;
        const updated = await taskService.update(id, payload);
        res.status(200).json(updated);
    }
    catch (err) {
        res.status(404).json({ message: "Classe not found" });
    }
}
export async function deleteClasse(req, res) {
    const idParam = req.params.id;
    if (!idParam)
        return res.status(400).json({ message: "id required" });
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id))
        return res.status(400).json({ message: "id must be a number" });
    try {
        await taskService.delete(id);
        res.status(204).send();
    }
    catch (err) {
        res.status(404).json({ message: "Classe not found" });
    }
}
export async function Addpermission(req, res) {
    const taskId = Number(req.params.id);
    const verif = shemaupdate.safeParse(req.body);
    if (!verif.success)
        return res.status(401).json({ message: "erreur" });
    const { userId } = verif.data;
    const up = await taskService.addPermission(taskId, userId);
    return res.status(200).json({
        messagge: "reussie",
        data: up
    });
}
//# sourceMappingURL=task.controller.js.map
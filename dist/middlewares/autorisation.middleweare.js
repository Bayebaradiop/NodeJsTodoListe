import { TaskService } from "../services/task.service.js";
const taskservice = new TaskService();
export class Autorisation {
    static async permission(req, res, next) {
        const paramsid = Number(req.params.id);
        const recup = await taskservice.findById(paramsid);
        if (!recup)
            return res.status(401).json({ message: "id n'existe pas" });
        if (recup.userId != req.user?.id && !recup.allowedUsers.some(u => u.id === req.user?.id)) {
            return res.status(401).json({ message: "Acces refuser sam wadji" });
        }
        next();
    }
}
//# sourceMappingURL=autorisation.middleweare.js.map
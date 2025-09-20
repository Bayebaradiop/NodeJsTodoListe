import { PrismaClient } from "@prisma/client";
import { TaskRepository } from "../repositories/taskrepository.js";
const prisma = new PrismaClient();
const taskrepository = new TaskRepository();
export class TaskService {
    async create(task) {
        return await taskrepository.create(task);
    }
    async findAll() {
        return await taskrepository.findAll();
    }
    async findById(id) {
        return await taskrepository.findById(id);
    }
    async update(id, task) {
        return await taskrepository.update(id, task);
    }
    async delete(id) {
        return await taskrepository.delete(id);
    }
    async addPermission(taskId, userId) {
        return await taskrepository.addpermission(taskId, userId);
    }
}
//# sourceMappingURL=task.service.js.map
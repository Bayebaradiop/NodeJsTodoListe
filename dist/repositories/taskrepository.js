import { PrismaClient } from "@prisma/client";
import { string } from "zod";
const prisma = new PrismaClient();
export class TaskRepository {
    async create(task) {
        return await prisma.task.create({
            data: task,
        });
    }
    async findAll() {
        return await prisma.task.findMany();
    }
    async findById(id) {
        return await prisma.task.findUnique({
            where: { id },
            include: { allowedUsers: true }
        });
    }
    async update(id, classe) {
        return await prisma.task.update({
            where: { id },
            data: classe,
        });
    }
    async delete(id) {
        await prisma.task.delete({
            where: { id },
        });
    }
    async addpermission(taskId, userId) {
        return await prisma.task.update({
            where: { id: taskId },
            data: {
                allowedUsers: {
                    connect: { id: userId }
                },
            },
            include: { allowedUsers: true }
        });
    }
}
//# sourceMappingURL=taskrepository.js.map
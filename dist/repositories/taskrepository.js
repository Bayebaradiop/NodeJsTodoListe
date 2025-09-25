import { PrismaClient } from "@prisma/client";
import { getPagination } from "../services/paginator.service.js";
import { string } from "zod";
const prisma = new PrismaClient();
export class TaskRepository {
    async create(task) {
        return await prisma.task.create({
            data: task,
        });
    }
    async findAll() {
        return await prisma.task.findMany({
            include: {
                user: true,
                allowedUsers: true
            }
        });
    }
    async findAllPaginated(page = 1, limit = 10) {
        const { skip, take } = getPagination(page, limit);
        const [data, total] = await prisma.$transaction([
            prisma.task.findMany({
                skip,
                take,
                orderBy: { createdAt: 'desc' },
                include: { user: true, allowedUsers: true }
            }),
            prisma.task.count()
        ]);
        return { data, total };
    }
    async findUserTasks(userId) {
        const tasks = await prisma.task.findMany({
            where: {
                OR: [
                    { userId: userId }, // Tâches créées par l'utilisateur
                    { allowedUsers: { some: { id: userId } } } // Tâches où l'utilisateur a des permissions
                ]
            },
            include: {
                user: true,
                allowedUsers: true
            }
        });
        return tasks;
    }
    async findUserTasksPaginated(userId, page = 1, limit = 10) {
        const { skip, take } = getPagination(page, limit);
        const where = {
            OR: [
                { userId: userId },
                { allowedUsers: { some: { id: userId } } }
            ]
        };
        const [data, total] = await prisma.$transaction([
            prisma.task.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
                include: { user: true, allowedUsers: true }
            }),
            prisma.task.count({ where })
        ]);
        return { data, total };
    }
    async findById(id) {
        return await prisma.task.findUnique({
            where: { id },
            include: {
                allowedUsers: true,
                user: true
            }
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
    async updateEtat(id, etat) {
        return await prisma.task.update({
            where: { id },
            data: { etat },
            include: {
                user: true,
                allowedUsers: true
            }
        });
    }
}
//# sourceMappingURL=taskrepository.js.map
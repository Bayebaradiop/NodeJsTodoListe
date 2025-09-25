import { PrismaClient, ActionType } from "@prisma/client";
const prisma = new PrismaClient();
export class ActionHistoryRepository {
    async createActionHistory(data) {
        return await prisma.actionHistory.create({
            data,
        });
    }
    async getAllActionHistories() {
        return await prisma.actionHistory.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                user: { select: { id: true, nom: true, email: true } },
                task: { select: { id: true, titre: true, description: true, photo: true, etat: true } },
            },
        });
    }
    async getActionHistoriesByUser(userId) {
        return await prisma.actionHistory.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            include: {
                user: { select: { id: true, nom: true, email: true } },
                task: { select: { id: true, titre: true, description: true, photo: true, etat: true } },
            },
        });
    }
}
export const actionHistoryRepository = new ActionHistoryRepository();
//# sourceMappingURL=actionHistory.repository.js.map
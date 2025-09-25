import { PrismaClient, ActionType } from "@prisma/client";

const prisma = new PrismaClient();

export class ActionHistoryRepository {
  async createActionHistory(data: {
    userId: number;
    taskId: number;
    action: ActionType;
    details?: string | null;
  }) {
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

  async getActionHistoriesByUser(userId: number) {
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

import { actionHistoryRepository } from "../repositories/actionHistory.repository.js";

export class ActionHistoryService {
  async record(params: { userId: number; taskId: number; action: "CREATE" | "READ" | "UPDATE" | "DELETE"; details?: string | null }) {
    const { userId, taskId, action, details = null } = params; // Default to null if undefined
    return await actionHistoryRepository.createActionHistory({
      userId,
      taskId,
      action,
      details,
    });
  }

  async findAll() {
    return await actionHistoryRepository.getAllActionHistories();
  }

  async findByUser(userId: number) {
    return await actionHistoryRepository.getActionHistoriesByUser(userId);
  }
}

export const actionHistoryService = new ActionHistoryService();

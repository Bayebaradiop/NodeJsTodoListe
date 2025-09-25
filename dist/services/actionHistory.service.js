import { actionHistoryRepository } from "../repositories/actionHistory.repository.js";
export class ActionHistoryService {
    async record(params) {
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
    async findByUser(userId) {
        return await actionHistoryRepository.getActionHistoriesByUser(userId);
    }
}
export const actionHistoryService = new ActionHistoryService();
//# sourceMappingURL=actionHistory.service.js.map
import { ActionType } from "@prisma/client";
export declare class ActionHistoryRepository {
    createActionHistory(data: {
        userId: number;
        taskId: number;
        action: ActionType;
        details?: string | null;
    }): Promise<{
        id: number;
        userId: number;
        createdAt: Date;
        action: import("@prisma/client").$Enums.ActionType;
        details: string | null;
        taskId: number;
    }>;
    getAllActionHistories(): Promise<({
        task: {
            id: number;
            titre: string;
            description: string;
            etat: import("@prisma/client").$Enums.Etat;
            photo: string | null;
        };
        user: {
            id: number;
            nom: string;
            email: string;
        };
    } & {
        id: number;
        userId: number;
        createdAt: Date;
        action: import("@prisma/client").$Enums.ActionType;
        details: string | null;
        taskId: number;
    })[]>;
    getActionHistoriesByUser(userId: number): Promise<({
        task: {
            id: number;
            titre: string;
            description: string;
            etat: import("@prisma/client").$Enums.Etat;
            photo: string | null;
        };
        user: {
            id: number;
            nom: string;
            email: string;
        };
    } & {
        id: number;
        userId: number;
        createdAt: Date;
        action: import("@prisma/client").$Enums.ActionType;
        details: string | null;
        taskId: number;
    })[]>;
}
export declare const actionHistoryRepository: ActionHistoryRepository;
//# sourceMappingURL=actionHistory.repository.d.ts.map
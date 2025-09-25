export declare class ActionHistoryService {
    record(params: {
        userId: number;
        taskId: number;
        action: "CREATE" | "READ" | "UPDATE" | "DELETE";
        details?: string | null;
    }): Promise<{
        id: number;
        userId: number;
        createdAt: Date;
        action: import("@prisma/client").$Enums.ActionType;
        details: string | null;
        taskId: number;
    }>;
    findAll(): Promise<({
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
    findByUser(userId: number): Promise<({
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
export declare const actionHistoryService: ActionHistoryService;
//# sourceMappingURL=actionHistory.service.d.ts.map
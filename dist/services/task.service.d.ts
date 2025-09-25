import { type TaskCreate, type TaskUpdate } from "../repositories/taskrepository.js";
export declare class TaskService {
    create(task: TaskCreate): Promise<{
        id: number;
        titre: string;
        description: string;
        etat: import("@prisma/client").$Enums.Etat;
        userId: number;
        photo: string | null;
        audio: string | null;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        titre: string;
        description: string;
        etat: import("@prisma/client").$Enums.Etat;
        userId: number;
        photo: string | null;
        audio: string | null;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findAllPaginated(page?: number, limit?: number): Promise<{
        data: import("@prisma/client").Task[];
        total: number;
    }>;
    findUserTasks(userId: number): Promise<{
        id: number;
        titre: string;
        description: string;
        etat: import("@prisma/client").$Enums.Etat;
        userId: number;
        photo: string | null;
        audio: string | null;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findUserTasksPaginated(userId: number, page?: number, limit?: number): Promise<{
        data: import("@prisma/client").Task[];
        total: number;
    }>;
    findById(id: number): Promise<({
        id: number;
        titre: string;
        description: string;
        etat: import("@prisma/client").$Enums.Etat;
        userId: number;
        photo: string | null;
        audio: string | null;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } & {
        allowedUsers: import("@prisma/client").User[];
        user: import("@prisma/client").User;
    }) | null>;
    update(id: number, task: TaskUpdate): Promise<{
        id: number;
        titre: string;
        description: string;
        etat: import("@prisma/client").$Enums.Etat;
        userId: number;
        photo: string | null;
        audio: string | null;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: number): Promise<void>;
    addPermission(taskId: number, userId: number): Promise<{
        allowedUsers: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nom: string;
            email: string;
            password: string;
        }[];
    } & {
        id: number;
        titre: string;
        description: string;
        etat: import("@prisma/client").$Enums.Etat;
        userId: number;
        photo: string | null;
        audio: string | null;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateEtat(id: number, etat: "ENCOURS" | "TERMINER"): Promise<{
        id: number;
        titre: string;
        description: string;
        etat: import("@prisma/client").$Enums.Etat;
        userId: number;
        photo: string | null;
        audio: string | null;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    calculateDuration(startDate: Date | null, endDate: Date | null): string | null;
    autoCompleteExpiredTasks(tasks: any[]): Promise<any[]>;
}
//# sourceMappingURL=task.service.d.ts.map
import { type TaskCreate, type TaskUpdate } from "../repositories/taskrepository.js";
export declare class TaskService {
    create(task: TaskCreate): Promise<{
        id: number;
        titre: string;
        description: string;
        etat: import("@prisma/client").$Enums.Etat;
        userId: number;
        photo: string | null;
    }>;
    findAll(): Promise<{
        id: number;
        titre: string;
        description: string;
        etat: import("@prisma/client").$Enums.Etat;
        userId: number;
        photo: string | null;
    }[]>;
    findById(id: number): Promise<({
        id: number;
        titre: string;
        description: string;
        etat: import("@prisma/client").$Enums.Etat;
        userId: number;
        photo: string | null;
    } & {
        allowedUsers: import("@prisma/client").User[];
    }) | null>;
    update(id: number, task: TaskUpdate): Promise<{
        id: number;
        titre: string;
        description: string;
        etat: import("@prisma/client").$Enums.Etat;
        userId: number;
        photo: string | null;
    }>;
    delete(id: number): Promise<void>;
    addPermission(taskId: number, userId: number): Promise<{
        allowedUsers: {
            id: number;
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
    }>;
}
//# sourceMappingURL=task.service.d.ts.map
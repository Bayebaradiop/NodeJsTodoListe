import { type User, type Task } from "@prisma/client";
import type { Icrud } from "../interfaces/index.js";
export type TaskCreate = Omit<Task, "id"> & {
    userId: number;
};
export type TaskUpdate = Partial<TaskCreate>;
export declare class TaskRepository implements Icrud<Task, TaskCreate, TaskUpdate, number> {
    create(task: TaskCreate): Promise<Task>;
    findAll(): Promise<Task[]>;
    findAllPaginated(page?: number, limit?: number): Promise<{
        data: Task[];
        total: number;
    }>;
    findUserTasks(userId: number): Promise<Task[]>;
    findUserTasksPaginated(userId: number, page?: number, limit?: number): Promise<{
        data: Task[];
        total: number;
    }>;
    findById(id: number): Promise<Task & {
        allowedUsers: User[];
        user: User;
    } | null>;
    update(id: number, classe: TaskUpdate): Promise<Task>;
    delete(id: number): Promise<void>;
    addpermission(taskId: number, userId: number): Promise<{
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
    updateEtat(id: number, etat: "ENCOURS" | "TERMINER"): Promise<Task>;
}
//# sourceMappingURL=taskrepository.d.ts.map
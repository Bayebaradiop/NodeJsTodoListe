import { type User, type Task } from "@prisma/client";
import type { Icrud } from "../interfaces/index.js";
export type TaskCreate = Omit<Task, "id"> & {
    userId: number;
};
export type TaskUpdate = Partial<TaskCreate>;
export declare class TaskRepository implements Icrud<Task, TaskCreate, TaskUpdate, number> {
    create(task: TaskCreate): Promise<Task>;
    findAll(): Promise<Task[]>;
    findById(id: number): Promise<Task & {
        allowedUsers: User[];
    } | null>;
    update(id: number, classe: TaskUpdate): Promise<Task>;
    delete(id: number): Promise<void>;
    addpermission(taskId: number, userId: number): Promise<{
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
//# sourceMappingURL=taskrepository.d.ts.map
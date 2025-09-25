import type { Request, Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware.js";
export declare function getTasksbyUser(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getAllTasks(req: AuthRequest, res: Response): Promise<void>;
export declare function getTasksById(req: Request<{
    id: string;
}>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function createTasks(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateTasks(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteTasks(req: AuthRequest & Request<{
    id: string;
}>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function Addpermission(req: AuthRequest & Request<{
    id: string;
}>, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function updateEtat(req: AuthRequest & Request<{
    id: string;
}>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=task.controller.d.ts.map
import { type Request, type Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware.js";
export declare function inscription(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function login(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getCurrentUser(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getAllUsers(req: AuthRequest, res: Response): Promise<void>;
export declare function logout(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=user.controller.d.ts.map
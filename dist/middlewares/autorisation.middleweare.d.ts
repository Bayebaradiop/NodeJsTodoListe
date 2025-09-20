import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./auth.middleware.js";
export declare class Autorisation {
    static permission(req: AuthRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=autorisation.middleweare.d.ts.map
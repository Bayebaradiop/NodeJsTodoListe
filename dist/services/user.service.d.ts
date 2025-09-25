import type { IUserLogin, usercreate } from "../interfaces/Iuser.js";
export declare class userservice {
    registre(user: usercreate): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nom: string;
        email: string;
    } | {
        errorType: string;
    }>;
    login(data: IUserLogin): Promise<{
        errorType: string;
        token?: never;
        user?: never;
    } | {
        token: string;
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nom: string;
            email: string;
        };
        errorType?: never;
    }>;
    findUserById(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nom: string;
        email: string;
        password: string;
    } | null>;
    getAllUsers(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nom: string;
        email: string;
    }[]>;
}
//# sourceMappingURL=user.service.d.ts.map
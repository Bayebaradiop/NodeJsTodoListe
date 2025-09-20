import type { usercreate, IUserLogin } from "../interfaces/Iuser.js";
export declare class userservice {
    registre(user: usercreate): Promise<{
        id: number;
        nom: string;
        email: string;
        password: string;
    }>;
    login(data: IUserLogin): Promise<{
        token: string;
        user: {
            id: number;
            nom: string;
            email: string;
        };
    }>;
}
//# sourceMappingURL=user.service.d.ts.map
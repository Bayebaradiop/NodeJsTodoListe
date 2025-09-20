import { type User } from "@prisma/client";
import type { usercreate } from "../interfaces/Iuser.js";
export declare class userRepository {
    create(data: usercreate): Promise<User>;
    findbymail(email: string): Promise<User | null>;
}
//# sourceMappingURL=user.repositories.d.ts.map
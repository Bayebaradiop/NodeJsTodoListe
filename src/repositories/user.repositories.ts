import { PrismaClient, type User } from "@prisma/client";
import type {IUser,usercreate,IUserLogin} from "../interfaces/Iuser.js"
import type { promises } from "dns";

const prisma=new PrismaClient();

export class userRepository{

    async create(data:usercreate):Promise<User>{
    return prisma.user.create(
        {
        data
        }
    )
    }

    async findbymail(email:string):Promise<User | null>{
        return await prisma.user.findUnique({
            where:{email}
        })
    }
}

import { userRepository } from "../repositories/user.repositories.js";
import type { IUser,usercreate,IUserLogin } from "../interfaces/Iuser.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

const userepository = new userRepository();

export class userservice {

    async registre(user: usercreate) {
        const hash = await bcrypt.hash(user.password, 10);

        const newuser = await userepository.create({
            ...user,
            password: hash
        });

        return newuser
    }

     async login(data: IUserLogin) {
        const user = await userepository.findbymail(data.email);
        if (!user) throw new Error("Email incorrect");

        const isValid = await bcrypt.compare(data.password, user.password);
        if (!isValid) throw new Error("Mot de passe incorrect");

        const token = Jwt.sign(
            { id: user.id, email: user.email },       
            process.env.JWT_SECRET as string,        
            { expiresIn: "1h" }                      
        );

        const { password, ...userWithoutPassword } = user;
        return { token, user: userWithoutPassword };
    }
}

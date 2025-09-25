import { userRepository } from "../repositories/user.repositories.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
const userepository = new userRepository();
export class userservice {
    async registre(user) {
        // Vérifier si l'email existe déjà
        const existingUser = await userepository.findbymail(user.email);
        if (existingUser) {
            return { errorType: "EMAIL_ALREADY_USED" };
        }
        const hash = await bcrypt.hash(user.password, 10);
        const newuser = await userepository.create({ ...user, password: hash });
        const { password, ...userWithoutPassword } = newuser;
        return userWithoutPassword;
    }
    async login(data) {
        const user = await userepository.findbymail(data.email);
        if (!user)
            return { errorType: "INVALID_EMAIL" };
        const isValid = await bcrypt.compare(data.password, user.password);
        if (!isValid)
            return { errorType: "INVALID_PASSWORD" };
        const token = Jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const { password, ...userWithoutPassword } = user;
        return { token, user: userWithoutPassword };
    }
    async findUserById(id) {
        return await userepository.findbyid(id);
    }
    async getAllUsers() {
        const users = await userepository.findAll();
        return users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
    }
}
//# sourceMappingURL=user.service.js.map
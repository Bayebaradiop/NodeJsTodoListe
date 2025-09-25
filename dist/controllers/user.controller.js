import {} from "express";
import { Prisma } from "@prisma/client";
import { userservice } from "../services/user.service.js";
import { shemasinscrire, schemaLogin } from "../validator/login.validator.js";
import { ERROR_MESSAGES } from "../errors/errorMessages.js";
const useservice = new userservice();
// export async function inscription(req: Request, res: Response) {
//   try {
//     const valide = shemasinscrire.safeParse(req.body);
//     if (!valide.success) {
//       return res.status(400).json({
//         message: ERROR_MESSAGES.VALIDATION_ERROR,
//         errors: valide.error.format(),
//       });
//     }
//     const user = await useservice.registre(valide.data);
//     res.json({
//       message: "Inscription réussie",
//       data: user,
//     });
//   } catch (error) {
//     console.error("Erreur lors de l'inscription:", error);
//     if ((error as any)?.code === "P2002") {
//       return res.status(409).json({ message: ERROR_MESSAGES.EMAIL_ALREADY_USED });
//     }
//     res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER });
//   }
// }
export async function inscription(req, res) {
    try {
        const valide = shemasinscrire.safeParse(req.body);
        if (!valide.success) {
            return res.status(400).json({
                message: ERROR_MESSAGES.VALIDATION_ERROR,
                errors: valide.error.format(),
            });
        }
        const result = await useservice.registre(valide.data);
        if ("errorType" in result && result.errorType === "EMAIL_ALREADY_USED") {
            return res.status(409).json({ message: ERROR_MESSAGES.EMAIL_ALREADY_USED });
        }
        res.json({
            message: "Inscription réussie",
            data: result,
        });
    }
    catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER });
    }
}
export async function login(req, res) {
    try {
        const verif = schemaLogin.safeParse(req.body);
        if (!verif.success) {
            return res.status(400).json({
                message: ERROR_MESSAGES.VALIDATION_ERROR,
                errors: verif.error.format(),
            });
        }
        const { email, password } = verif.data;
        const result = await useservice.login({ email, password });
        if (result.errorType === "INVALID_EMAIL") {
            return res.status(401).json({ message: ERROR_MESSAGES.INVALID_EMAIL });
        }
        if (result.errorType === "INVALID_PASSWORD") {
            return res.status(401).json({ message: ERROR_MESSAGES.INVALID_PASSWORD });
        }
        const { token, user } = result;
        res.cookie("acces_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        });
        res.json({
            message: "Connexion réussie",
            data: user,
        });
    }
    catch (error) {
        console.error("Erreur lors du login:", error);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER });
    }
}
export async function getCurrentUser(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: ERROR_MESSAGES.UNAUTHENTICATED });
        }
        const user = await useservice.findUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
        }
        const { password, ...userWithoutPassword } = user;
        res.json({
            message: "Utilisateur récupéré avec succès",
            data: userWithoutPassword,
        });
    }
    catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER });
    }
}
export async function getAllUsers(req, res) {
    try {
        const users = await useservice.getAllUsers();
        res.json({
            message: "Utilisateurs récupérés avec succès",
            data: users,
        });
    }
    catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER });
    }
}
export async function logout(req, res) {
    try {
        res.clearCookie("acces_token", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });
        res.status(200).json({ message: "Déconnexion réussie" });
    }
    catch (error) {
        console.error("Erreur lors de la déconnexion:", error);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER });
    }
}
//# sourceMappingURL=user.controller.js.map
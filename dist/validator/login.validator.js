import { email, z } from "zod";
export const shemasinscrire = z.object({
    email: z.string().min(1, "au moins un caractere"),
    password: z.string().min(4, "minimum 4 caractere"),
    nom: z.string().min(1, "au moins un caractere")
});
export const schemaLogin = z.object({
    email: z.string().email("L'email est invalide"),
    password: z.string().min(1, "Le mot de passe est requis")
});
//# sourceMappingURL=login.validator.js.map
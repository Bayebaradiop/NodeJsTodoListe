import { z } from "zod";
// Validation pour la création d'une tâche
export const schemaCreateTask = z.object({
    titre: z.string().min(1, "Le titre est requis").max(255, "Le titre ne peut pas dépasser 255 caractères"),
    description: z.string().min(1, "La description est requise").max(1000, "La description ne peut pas dépasser 1000 caractères"),
    etat: z.enum(["ENCOURS", "TERMINER"]).optional().default("ENCOURS"),
    photo: z.string().optional()
});
// Validation pour la mise à jour d'une tâche
export const schemaUpdateTask = z.object({
    titre: z.string().min(1, "Le titre est requis").max(255, "Le titre ne peut pas dépasser 255 caractères").optional(),
    description: z.string().min(1, "La description est requise").max(1000, "La description ne peut pas dépasser 1000 caractères").optional(),
    etat: z.enum(["ENCOURS", "TERMINER"]).optional(),
    photo: z.string().optional()
});
// Validation pour la mise à jour de l'état uniquement
export const schemaUpdateEtat = z.object({
    etat: z.enum(["ENCOURS", "TERMINER"], {
        message: "L'état doit être 'ENCOURS' ou 'TERMINER'"
    })
});
// Validation pour ajouter une permission (autoriser un utilisateur)
export const schemaAddPermission = z.object({
    userId: z.number().int("L'ID utilisateur doit être un nombre entier").positive("L'ID utilisateur doit être positif")
});
// Validation pour les paramètres d'ID dans les URLs
export const schemaTaskId = z.object({
    id: z.string().regex(/^\d+$/, "L'ID doit être un nombre").transform(Number)
});
// Validation pour la recherche/filtrage des tâches
export const schemaTaskFilter = z.object({
    etat: z.enum(["ENCOURS", "TERMINER"]).optional(),
    userId: z.number().int().positive().optional(),
    page: z.number().int().positive().optional().default(1),
    limit: z.number().int().positive().max(100).optional().default(10)
});
// Validation pour l'upload de photo
export const schemaPhotoUpload = z.object({
    photo: z.any().optional() // Le middleware multer gère la validation du fichier
});
// Anciens schémas (pour compatibilité)
export const schemacreate = schemaCreateTask;
export const shemaupdate = schemaAddPermission;
//# sourceMappingURL=task.js.map
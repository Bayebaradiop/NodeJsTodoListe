import { z } from "zod";
export declare const schemaCreateTask: z.ZodObject<{
    titre: z.ZodString;
    description: z.ZodString;
    etat: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        ENCOURS: "ENCOURS";
        TERMINER: "TERMINER";
    }>>>;
    photo: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const schemaUpdateTask: z.ZodObject<{
    titre: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    etat: z.ZodOptional<z.ZodEnum<{
        ENCOURS: "ENCOURS";
        TERMINER: "TERMINER";
    }>>;
    photo: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const schemaUpdateEtat: z.ZodObject<{
    etat: z.ZodEnum<{
        ENCOURS: "ENCOURS";
        TERMINER: "TERMINER";
    }>;
}, z.core.$strip>;
export declare const schemaAddPermission: z.ZodObject<{
    userId: z.ZodNumber;
}, z.core.$strip>;
export declare const schemaTaskId: z.ZodObject<{
    id: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
}, z.core.$strip>;
export declare const schemaTaskFilter: z.ZodObject<{
    etat: z.ZodOptional<z.ZodEnum<{
        ENCOURS: "ENCOURS";
        TERMINER: "TERMINER";
    }>>;
    userId: z.ZodOptional<z.ZodNumber>;
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
export declare const schemaPhotoUpload: z.ZodObject<{
    photo: z.ZodOptional<z.ZodAny>;
}, z.core.$strip>;
export declare const schemacreate: z.ZodObject<{
    titre: z.ZodString;
    description: z.ZodString;
    etat: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        ENCOURS: "ENCOURS";
        TERMINER: "TERMINER";
    }>>>;
    photo: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const shemaupdate: z.ZodObject<{
    userId: z.ZodNumber;
}, z.core.$strip>;
//# sourceMappingURL=task.d.ts.map
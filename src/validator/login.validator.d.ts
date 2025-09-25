import { z } from "zod";
export declare const shemasinscrire: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    nom: z.ZodString;
}, z.core.$strip>;
export declare const schemaLogin: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=login.validator.d.ts.map
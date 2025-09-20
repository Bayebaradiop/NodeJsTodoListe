import {z} from "zod";


export const schemacreate=z.object({
    nom:z.string().min(1,"au moins un caractere"),
})


export const shemaupdate=z.object({
    userId:z.number().int("doit etre un nobre").positive("doit etre positive"),

})
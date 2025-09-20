import { response, type Request, type Response } from "express";
import { userservice } from "../services/user.service.js";
import { shemasinscrire, schemaLogin } from "../validator/login.validator.js";
import { error } from "console";
import { strict } from "assert";


const useservice = new userservice();


export async function inscription(req: Request, res: Response) {

    const valide = shemasinscrire.safeParse(req.body)
    if (!valide.success) {
        res.status(400).json({
            message: "erreur lors de l'ajout",
            errors: valide.error.format(),
        });
        
        return
    }

    const user = await useservice.registre(valide.data);
    res.json(
        {
            message: "inscription reussi",
            data: user
        }
    )
}

export async function login(req: Request, res: Response) {
    const verif = schemaLogin.safeParse(req.body);
    if (!verif.success) return res.status(400).json({
        message: "erreur lors de la connexion",
        errors: verif.error.format(),
    })

    const {token,user} = await useservice.login(verif.data)

    res.cookie("acces_token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge:60*60*1000
    });

    res.json({
        message: "connexion reussi",
        data: user,
        token:token
    })
}
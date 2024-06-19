import z from 'zod';
import type { UserCredentionals, User } from "../types/authTypes";
import { Request, Response, NextFunction } from 'express';

//Validating user credentionals middleware..
export function validateUserCredentionals(req: Request, res: Response, nextFunction: NextFunction) {
    const credentionals: UserCredentionals = req.body;
    const credentionalsSchema = z.object({
        email: z.string().email("Not a valid email"),
        password: z.string().min(6, "Invalid password length").max(12, "Invalid password length"),
    })   
    const isCredentionalsSchemaSafe = credentionalsSchema.safeParse(credentionals);
    if (!isCredentionalsSchemaSafe.success) {
        return res.status(500).send("Invalid Credentionals");
    }
    nextFunction();
}

//Validating user upon registeration midldeware..
export function validateUser(req: Request, res: Response, nextFunction: NextFunction) {
    const user: User = req.body
    const userSchema = z.object({
        email: z.string().email("Not a valid email"),
        displayName: z.string(),
        passwordHash: z.string().min(6, "Invalid password length").max(12, "Invalid password length"),
    })
    const isUserSchemaSafe = userSchema.safeParse(user);
    if (!isUserSchemaSafe.success) {
        return res.status(500).send("Invalid User");
    }
    nextFunction()
}
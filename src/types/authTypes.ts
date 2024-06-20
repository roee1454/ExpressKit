import { type Request } from "express"

export interface UserCredentionals {
    email: string,
    password: string,
}

export interface User {
    email: string,
    displayName: string,
    passwordHash: string,
    isVerified: boolean,
}

export interface SavedUser extends User {
    id: string
}

export interface RequestWithUser extends Request {
    user?: SavedUser | null;
}

//More types..

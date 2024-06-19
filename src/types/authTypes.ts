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

//More types..

export interface IUser {
    id: number;
    nom: string;
    email: string;
    password: string;
}
export type usercreate = Omit<IUser, "id">;
export interface IUserLogin {
    email: string;
    password: string;
}
//# sourceMappingURL=Iuser.d.ts.map
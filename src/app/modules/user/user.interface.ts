import { user_role } from "./user.constant";

export type TName = {
    firstName:string;
    middleName?:string;
    lastName:string
}

export interface IUser {
    name:TName;
    email:string;
    password:string;
    role:"customer" | 'admin'
}

export type TUserRoles = keyof typeof user_role
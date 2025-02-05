/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
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

export interface IUserModel extends Model<IUser>{
    isUserExistsByEmail(email: string): Promise<IUser>;
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
      ): Promise<boolean>;
}
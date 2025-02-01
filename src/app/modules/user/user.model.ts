import { model, Schema } from "mongoose";
import { IUser, TName } from "./user.interface";

const nameSchema = new Schema<TName>({
    firstName:{
        type:String,
        required:true
    },
    middleName:{
        type:String,
    },
    lastName:{
        type:String,
        required:true
    }
})


const userSchema = new Schema<IUser>({
    name:{
        type:nameSchema,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["admin", "customer"],
        default:"customer"
    }

},{
    timestamps:true
})

export const User = model<IUser>("User", userSchema)
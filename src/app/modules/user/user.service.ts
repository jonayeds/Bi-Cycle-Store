
import { JwtPayload } from "jsonwebtoken"
import { AppError } from "../../errors/appError"
import { IUser } from "./user.interface"
import { User } from "./user.model"

const registerUser = async (payload:IUser)=>{
    if(!payload?.role){
        payload.role = "customer"
    }
    
    const result  = await User.create(payload)
    return result
}

const getAllusers = async()=>{
    const result = await User.find()
    return result 
}

const togleBlockUser = async(userId:string)=>{
    const isUserExists = await User.isUserExists(userId)
    if(!isUserExists){
        throw new AppError(404,"User not found")
    }
    const result = await User.findByIdAndUpdate(userId, {isBlocked:!isUserExists.isBlocked})
    return result
}

const updatePassword = async(payload:{oldPassword:string, newPassword:string}, user:JwtPayload)=>{
    const isPasswordMatched = await User.isPasswordMatched(payload.oldPassword, user.password)
    if(!isPasswordMatched){
        throw new AppError(400,'Password not Matched')
    }
    const newHashedPass = await User.hashPassword(payload.newPassword)
    const result = await User.findByIdAndUpdate(user._id, {password:newHashedPass}, {new:true})
    return result
}


export const UserServices = {
    registerUser,
    getAllusers,
    togleBlockUser,
    updatePassword
}
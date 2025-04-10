
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



export const UserServices = {
    registerUser,
    getAllusers,
    togleBlockUser
}
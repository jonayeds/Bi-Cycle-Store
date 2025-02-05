import { IUser } from "./user.interface"
import { User } from "./user.model"

const registerUser = async (payload:IUser)=>{
    if(!payload?.role){
        payload.role = "customer"
    }
    
    const result  = await User.create(payload)
    return result
}


export const UserServices = {
    registerUser
}
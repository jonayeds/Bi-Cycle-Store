import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const registerUser = catchAsync(async(req , res)=>{
    const user = req.body
    const result  = await UserServices.registerUser(user)
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Successfully Created User",
        data:result
    })

})
const getAllUsers = catchAsync(async(req , res)=>{
    const result  = await UserServices.getAllusers()
    sendResponse(res,{  
        success:true,
        statusCode:200,
        message:"Successfully fetched All User",
        data:result
    })

})

export const UserControllers = {
    registerUser,
    getAllUsers
}
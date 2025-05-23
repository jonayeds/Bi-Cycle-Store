import { JwtPayload } from "jsonwebtoken";
import { ICustomRequest } from "../../interfaces";
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
const toggleBlockUser = catchAsync(async(req , res)=>{
    const result  = await UserServices.togleBlockUser(req.params.userId)
    sendResponse(res,{  
        success:true,
        statusCode:200,
        message:"Successfully blocked/unblocked User",
        data:result
    })
})

const getMe = catchAsync(async(req:ICustomRequest,res)=>{
    sendResponse(res,{  
        success:true,
        statusCode:200,
        message:"Successfully fetched User",
        data:req.user
    })
})
const updatePassword = catchAsync(async(req:ICustomRequest,res)=>{
    const result = await UserServices.updatePassword(req.body, req.user as JwtPayload)
    sendResponse(res,{  
        success:true,
        statusCode:200,
        message:"Successfully updated User",
        data:result
    })
})

export const UserControllers = {
    registerUser,
    getAllUsers,
    toggleBlockUser,
    getMe,
    updatePassword
}
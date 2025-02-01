import { Response } from "express";

type TResponse<T> = {
    statusCode : number;
    message:string;
    success:true;
    data:T;
    meta?:{
        totalPage:number;
        page:number;
        total:number;
    }
}

export const sendResponse = <T>(res:Response, data:TResponse<T>)=>{
    res
    .status(data.statusCode)
    .json({
        success:data.success,
        message:data.message,
        meta:data?.meta,
        data:data.data,

    })
}

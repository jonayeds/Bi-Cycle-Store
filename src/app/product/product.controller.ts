import { Request, Response } from "express";
import { productServices } from "./product.service";

const createABiCycle =async (req:Request, res:Response)=>{
    try {
        const biCycle  = req.body
        const result  = await productServices.createABiCycle(biCycle)
        res
        .status(200)
        .json({
            success:true,
            message:"Bicycle created successfully",
            data:result
        })
        
    } catch (error) {
        res
        .status(500)
        .json({
            success:false,
            message:"something went wrong while creating BiCycle",
            error
        })
    }
   


}

export const productControllers = {
    createABiCycle,

}
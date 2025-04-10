import { Request, Response } from 'express';
import { orderServices } from './order.service';
import { ICustomRequest } from '../../interfaces';
import { JwtPayload } from 'jsonwebtoken';

const orderBiCycle = async (req: ICustomRequest, res: Response) => {
  try {
      const order = req.body;

    const result = await orderServices.orderABiCycle(order, req.user as JwtPayload);
    if(result === "outOfStock"){
        res
        .status(400)
        .json({
            success:false,
            message:"Product is out of stock",
            data:{}
        })
    }else{
        res.status(200).json({
            success: true,
            message: 'Order placed successfully',
            data: result,
          });
    }
    
  } catch (error) {
    res.status(400).json({
      success: true,
      message: 'Something went wrong',
      error,
    });
  }
};

const calculateRevenue = async(req:Request, res:Response)=>{
    try{
        const revenue = await orderServices.calculateRevenue()
        res
        .status(200)
        .json({
            success:true,
            message:"Revenue calculated successfully",
            data:revenue
        })
    }catch(error){
        res
        .status(400)
        .json({
            success:false,
            message:"Something went wrong while calculating Revenues",
            error
        })
    }

}
const createPayment = async(req:ICustomRequest, res:Response)=>{
    try{
        const result = await orderServices.createPayment(req.body, req.user as JwtPayload)
        res
        .status(200)
        .json({
            success:true,
            message:"Payment created successfully",
            data:result
        })
    }catch(error){
        res
        .status(400)
        .json({
            success:false,
            message:"Something went wrong while creating payment",
            error
        })
    }

}


const verifyPayment = async(req:ICustomRequest, res:Response)=>{
    try{
        const result = await orderServices.verifyPayment(req.params.paymentId)
        res
        .status(200)
        .json({
            success:true,
            message:"Payment verified successfully",
            data:result
        })
    }catch(error){
        res
        .status(400)
        .json({
            success:false,
            message:"Something went wrong while verifying payment",
            error
        })
    }

}


const getAllOrder = async(req:ICustomRequest, res:Response)=>{
    try{
        const result = await orderServices.getAllOrders()
        res
        .status(200)
        .json({
            success:true,
            message:"Orders Fetched successfully",
            data:result
        })
    }catch(error){
        res
        .status(400)
        .json({
            success:false,
            message:"Something went wrong while verifying payment",
            error
        })
    }

}

export const orderControllers= {
    orderBiCycle,
    calculateRevenue,
    createPayment,
    verifyPayment,
    getAllOrder
}

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

export const orderControllers= {
    orderBiCycle,
    calculateRevenue
}

import { Request, Response } from 'express';
import { orderServices } from './order.service';

const orderBiCycle = async (req: Request, res: Response) => {
  try {
      const order = req.body;
    const result = await orderServices.orderABiCycle(order);
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
            message: 'Order created successfully',
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

export const orderControllers= {
    orderBiCycle
}

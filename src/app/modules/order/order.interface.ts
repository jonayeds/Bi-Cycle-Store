import { Types } from "mongoose";


export interface IOrder{
    customer:Types.ObjectId
    product:Types.ObjectId,
    quantity:number,
    totalPrice:number
}
import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";
const orderSchema = new Schema<IOrder>({
    customer:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    product:{
        type: Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        validate:{
            validator:function(value){
                return value>=0
            },
            message:"quantity cannot be a negative number"
        },
    },
    totalPrice:{
        type:Number,
        required:true,
        validate:{
            validator:function(value:number){
                return value>=0
            },
            message:"Price cannot be Negative number"
        }
    },
    paymentSession:{
        type:String,
        required:true
    }

},{timestamps:true})

export const Order = model<IOrder>("Order", orderSchema)
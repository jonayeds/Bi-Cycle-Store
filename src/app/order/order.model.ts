import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";
import validator from "validator"
const orderSchema = new Schema<IOrder>({
    email:{
        type:String,
        required:true,
        validate:{
            validator: function(value:string){
                return validator.isEmail(value)
            },
            message:"{VALUE} is not a valid email"
        }
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
    }

},{timestamps:true})

export const Order = model<IOrder>("Order", orderSchema)
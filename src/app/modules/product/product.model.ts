import { model, Schema } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>({
    name:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        enum:[ "Mountain" , "Road" , "Hybrid" , "BMX" , "Electric"],
        required:true,
    },
    description:String,
    quantity:{
        type:Number,
        required:true
    },
    inStock:{
        type:Boolean,
        required:true
    },
    image:{
        type:String,
    }

},{timestamps:true})

export const Product = model<IProduct>("Product", productSchema)
import { model, ObjectId, Schema } from "mongoose";
import { IProduct, ProductModel } from "./product.interface";

const productSchema = new Schema<IProduct, ProductModel>({
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
    }

},{timestamps:true})

productSchema.statics.isInStock = async function(id:ObjectId){
    const existingProduct = await Product.findById(id)
    return existingProduct?.inStock
}

export const Product = model<IProduct, ProductModel>("Product", productSchema)
import { IProduct } from "./product.interface"
import { Product } from "./product.model"

const createABiCycle = async(biCycle:IProduct)=>{
    const result = Product.create(biCycle)
    return result
}

const getAllBiCycle = async ()=>{
    const result  = await Product.find()
    return result
}

export const  productServices = {
    createABiCycle,
    getAllBiCycle,
}
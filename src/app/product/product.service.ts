import { IProduct } from "./product.interface"
import { Product } from "./product.model"

const createABiCycle = async(biCycle:IProduct)=>{
    const result = Product.create(biCycle)
    return result
}

export const  productServices = {
    createABiCycle,

}
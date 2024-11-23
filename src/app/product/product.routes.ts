import express from "express"
import { productControllers } from "./product.controller"
export const productRouter = express.Router()

productRouter.post("/", productControllers.createABiCycle )
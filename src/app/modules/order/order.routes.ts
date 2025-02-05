import express from 'express'
import { orderControllers } from './order.controller'

 const orderRouter = express.Router()

// order routes
orderRouter.post("/", orderControllers.orderBiCycle)
orderRouter.get("/revenue", orderControllers.calculateRevenue)

export const OrderRoutes = orderRouter
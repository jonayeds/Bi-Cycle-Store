import express from 'express'
import { orderControllers } from './order.controller'

export const orderRouter = express.Router()

// order routes
orderRouter.post("/", orderControllers.orderBiCycle)
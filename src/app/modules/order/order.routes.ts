import express from 'express'
import { orderControllers } from './order.controller'
import { auth } from '../../middlewares/auth'
import { user_role } from '../user/user.constant'
import { OrderValidations } from './order.validation'
import { requestValidator } from '../../middlewares/requestValidator'

 const orderRouter = express.Router()

// order routes
orderRouter.post("/", auth(user_role.customer), requestValidator(OrderValidations.createOrderValidationSchema),orderControllers.orderBiCycle)
orderRouter.get("/revenue", orderControllers.calculateRevenue)

export const OrderRoutes = orderRouter
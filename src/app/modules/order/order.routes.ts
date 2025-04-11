import express from 'express'
import { orderControllers } from './order.controller'
import { auth } from '../../middlewares/auth'
import { user_role } from '../user/user.constant'
import { OrderValidations } from './order.validation'
import { requestValidator } from '../../middlewares/requestValidator'

 const orderRouter = express.Router()

// order routes
orderRouter.post("/", auth(user_role.customer), requestValidator(OrderValidations.createOrderValidationSchema),orderControllers.orderBiCycle)
orderRouter.post("/create-payment", auth(user_role.customer), requestValidator(OrderValidations.createPaymentValidationSchema),orderControllers.createPayment)
orderRouter.post("/verify-payment/:paymentId", auth(user_role.customer),orderControllers.verifyPayment)
orderRouter.get("/revenue", orderControllers.calculateRevenue)
orderRouter.get("/my-orders",auth(user_role.customer), orderControllers.getMyOrders)
orderRouter.delete("/:orderId",auth(user_role.customer), orderControllers.deleteOrder)
orderRouter.get("/", auth(user_role.admin),orderControllers.getAllOrder)


export const OrderRoutes = orderRouter
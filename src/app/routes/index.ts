import { Router } from "express";
import { UserRoutes } from "../modules/auth/auth.routes";
import { ProductRoutes } from "../modules/product/product.routes";
import { OrderRoutes } from "../modules/order/order.routes";

export const router = Router()

const moduleRoutes = [
    {
        path:"/user",
        route:UserRoutes
    },
    {
        path:"/products",
        route:ProductRoutes
    },
    {
        path:"/orders",
        route:OrderRoutes
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));
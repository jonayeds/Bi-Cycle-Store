import { Router } from "express";
import { ProductRoutes } from "../modules/product/product.routes";
import { OrderRoutes } from "../modules/order/order.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/user/user.routes";

export const router = Router()

const moduleRoutes = [
    {
        path:"/users",
        route:UserRoutes
    },
    {
        path:"/auth",
        route:AuthRoutes
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

import express from "express"
import { requestValidator } from "../../middlewares/requestValidator"
import { AuthValidations } from "./auth.validation"
import { AuthControllers } from "./auth.controller"

const router = express.Router()

router.post("/login", 
            requestValidator(AuthValidations.loginValidationSchema),
            AuthControllers.userLogin
)
router.post("/refresh-token", 
            requestValidator(AuthValidations.refreshTokenValidationSchema),
            AuthControllers.refreshToken
)

export const AuthRoutes = router
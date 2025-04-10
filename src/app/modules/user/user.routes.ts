import express from 'express'
import { UserControllers } from './user.controller'
import { requestValidator } from '../../middlewares/requestValidator'
import { UserValidations } from './user.validation'
import { auth } from '../../middlewares/auth'
import { user_role } from './user.constant'


const router = express.Router()

router.post("/register-user",requestValidator(UserValidations.createUserValidationSchema), UserControllers.registerUser)
router.get("/", auth(user_role.admin),UserControllers.getAllUsers )

export const UserRoutes = router
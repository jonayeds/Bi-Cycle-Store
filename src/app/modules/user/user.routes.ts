import express from 'express'
import { UserControllers } from './user.controller'
import { requestValidator } from '../../middlewares/requestValidator'
import { UserValidations } from './user.validation'
import { auth } from '../../middlewares/auth'
import { user_role } from './user.constant'


const router = express.Router()

router.post("/register-user",requestValidator(UserValidations.createUserValidationSchema), UserControllers.registerUser)
router.get("/", auth(user_role.admin),UserControllers.getAllUsers )
router.patch("/update-password", auth(user_role.customer, user_role.admin), UserControllers.updatePassword)
router.patch("/:userId", auth(user_role.admin),UserControllers.toggleBlockUser )
router.get("/get-me", auth(user_role.customer, user_role.admin), UserControllers.getMe)


export const UserRoutes = router
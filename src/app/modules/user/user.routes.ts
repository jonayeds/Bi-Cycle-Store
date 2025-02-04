import express from 'express'
import { UserControllers } from './user.controller'
import { requestValidator } from '../../middlewares/requestValidator'
import { UserValidations } from './user.validation'


const router = express.Router()

router.post("/register-user",requestValidator(UserValidations.createUserValidationSchema), UserControllers.registerUser)

export const UserRoutes = router
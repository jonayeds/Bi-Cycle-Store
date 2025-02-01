import { z } from "zod";
import { roles } from "./user.constant";

const createUserValidationSchema = z.object({
    body:z.object({
        name:z.object({
            firstName:z.string(),
            middleName:z.string().optional(),
            lastName:z.string(),
        }),
        email:z.string({required_error:"email is required"}).email(),
        password:z.string().min(6),
        role:z.enum(roles as [string, ...string[]])
    })
})

export const UserValidations = {
    createUserValidationSchema
}
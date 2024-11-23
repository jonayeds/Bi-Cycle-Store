import { z } from "zod";

export const productValidationSchema = z.object({
    price:z
    .number()
    .nonnegative({message:"Price cannot bev a negative number"}),
    brand:z
    .string()
    .trim(),
    quantity:z
    .number({message:"Quantity must be a number"})
    .nonnegative({message:"Quantity cannot be a negative number"}),
    name:z
    .string()
    .trim(),
    inStock:z
    .boolean(),
    description:z
    .string()
    .optional(),
    type:z
    .enum([ "Mountain" , "Road" , "Hybrid" , "BMX" , "Electric"], {message:"Bi-Cycle is not a valid type"})
})


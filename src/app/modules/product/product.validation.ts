import { z } from 'zod';

export const productValidationSchema = z.object({
  price: z
    .number({ message: 'Price is Required [type:Number]' })
    .nonnegative({ message: 'Price cannot bev a negative number' }),
  brand: z.string({ message: 'Brand is Required [type:String]' }).trim(),
  quantity: z
    .number({ message: 'Quantity is Required [type:Number]' })
    .nonnegative({ message: 'Quantity cannot be a negative number' }),
  name: z.string().trim(),
  inStock: z.boolean({ message: 'inStock is Required [type:Boolean]' }),
  description: z.string().optional(),
  type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
    message: 'Type is not valid for a Bi-Cycle',
  }),
  image:z.string().optional()
});

// validation of the data that is used to update Bi-Cycle
export const updateBiCycleValidationSchema = z.object({
  price: z
    .number()
    .nonnegative({ message: 'Price cannot bev a negative number' })
    .optional(),
  brand: z.string().trim().optional(),
  quantity: z
    .number({ message: 'Quantity must be a number' })
    .nonnegative({ message: 'Quantity cannot be a negative number' })
    .optional(),
  name: z.string().trim().optional(),

  inStock: z.boolean().optional(),
  description: z.string().optional(),
  type: z
    .enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
      message: 'Type is not valid for a Bi-Cycle',
    })
    .optional(),
});

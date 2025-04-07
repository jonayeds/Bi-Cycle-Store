import { z } from 'zod';

const createOrderValidationSchema = z.object({
  body: z.object({
    product: z.string(),
    quantity: z.number(),
  }),
});

export const OrderValidations = {
  createOrderValidationSchema,
};

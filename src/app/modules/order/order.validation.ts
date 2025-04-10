import { z } from 'zod';

const createOrderValidationSchema = z.object({
  body: z.object({
    product: z.string(),
    paymentSession:z.string(),
    quantity : z.number().positive().int().optional()
  }),
});
const createPaymentValidationSchema = z.object({
  body: z.object({
    product: z.string(),
  }),
});

export const OrderValidations = {
  createOrderValidationSchema,
  createPaymentValidationSchema
};

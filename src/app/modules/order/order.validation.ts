import { z } from 'zod';

const createOrderValidationSchema = z.object({
  body: z.object({
    product: z.string(),
    paymentSession:z.string()
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

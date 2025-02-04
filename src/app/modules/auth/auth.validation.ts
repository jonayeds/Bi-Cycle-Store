import { z } from "zod";

const loginValidationSchema = z.object({
    body: z.object({
      email: z.string({ required_error: 'Id is Required' }),
      password: z.string({ required_error: 'Password is Required' }),
    }),
  });

  const refreshTokenValidationSchema = z.object({
    cookies: z.object({
      refreshToken: z.string({ required_error: 'Refresh token is required' }),
    }),
  });


export const AuthValidations = {
    loginValidationSchema,
    refreshTokenValidationSchema
}
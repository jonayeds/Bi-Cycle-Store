import { AnyZodObject } from "zod";
import { catchAsync } from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";

export const requestValidator = (schema: AnyZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      // validation
      console.log(req.body)
      await schema.parseAsync({
        body: req.body,
        cookies: req.cookies,
      });
      next();
    });
  };
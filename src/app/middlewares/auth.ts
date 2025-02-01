/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { TUserRoles } from "../modules/user/user.interface";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../errors/appError";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";

export const auth = (...requiredRoles:TUserRoles[])=>{
    return catchAsync((req:Request,res:Response,next:NextFunction)=>{
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new AppError(403, 'Unauthorized request');
          }
        try {
            const decoded = jwt.verify(accessToken, config.access_secret as string ) as JwtPayload
            const {role, email} = decoded
            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError(403, 'You are not authorized');
              }
        } catch (error) {
            throw new AppError(403, 'Unauthorized request');
        }
        next()
    })
}
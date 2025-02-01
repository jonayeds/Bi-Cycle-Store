/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { TUserRoles } from "../modules/user/user.interface";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../errors/appError";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { User } from "../modules/user/user.model";

export const auth = (...requiredRoles:TUserRoles[])=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
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

              const user = await User.isUserExistsByEmail(email);
              if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError(403, 'You are not authorized');
              }
              req.user = decoded as JwtPayload;
              if (!user) {
                throw new AppError(404, 'User not found');
              }
        } catch (error) {
            throw new AppError(403, 'Unauthorized request');
        }
        next()
    })
}
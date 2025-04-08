/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../errors/appError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

import { User } from '../modules/user/user.model';
import { TUserRoles } from '../modules/user/user.interface';
import { ICustomRequest } from '../interfaces';

export const auth = (...requiredRoles: TUserRoles[]) => {
  return catchAsync(async (req: ICustomRequest, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;
    // checking is the token exist
    if (!accessToken) {
      throw new AppError(403, 'Unauthorized request');
    }

    try {
      // check if the token is valid
      const decoded = jwt.verify(
        accessToken,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      const { role, email, iat } = decoded;
      
      const user = await User.isUserExistsByEmail(email);


      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(403, 'You are not authorized');
      }
      if (!user) {
        throw new AppError(404, 'User not found');
      }
      req.user = user;

    } catch (err) {
      throw new AppError(403, 'Unauthorized request');
    }

    next();
  });
};

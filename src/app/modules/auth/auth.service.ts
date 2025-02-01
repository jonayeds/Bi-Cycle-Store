import config from "../../config";
import { AppError } from "../../errors/appError";
import { User } from "../user/user.model"
import { ILoginUser } from "./auth.interface"
import { createToken } from "./auth.utils";

const loginUser = async(payload:ILoginUser)=>{
    const user = await User.isUserExistsByEmail(payload.email);
    if (!user) {
        throw new AppError(404, 'User not found');
    }
    if (!(await User.isPasswordMatched(payload.password, user.password))) {
        throw new AppError(403, 'Your password is wrong');
      }
      const jwtPayload = {
        email: user.email,
        role: user.role,
      };
      const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        {expiresIn:"10d"}
      );
      const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        {expiresIn:"365d"},
      );
      return {
        accessToken,
        refreshToken,
      };
}

export const AuthServices ={
    loginUser
}
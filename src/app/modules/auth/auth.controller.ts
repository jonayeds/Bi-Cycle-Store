import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const userLogin =catchAsync(async(req,res)=>{
    const loginData = req.body
    const result = await AuthServices.loginUser(loginData);
    const { refreshToken, accessToken} = result;
    res.cookie('refreshToken', refreshToken, {
        secure: true,
        httpOnly: true,
      });
    sendResponse(res, {
        success: true,
        message: 'Successfully Logged in',
        statusCode: 200,
        data: {
          accessToken,
        },
      });
})

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);
  
    sendResponse(res, {
      success: true,
      message: 'Access token is retrieved successfully ',
      statusCode: 200,
      data: result,
    });
  });

export const AuthControllers = {
    userLogin,
    refreshToken
}
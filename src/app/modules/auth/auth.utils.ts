import jwt, { SignOptions } from 'jsonwebtoken'

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,   
  expiresIn:SignOptions
) => {
    return jwt.sign(jwtPayload, secret, expiresIn)
};

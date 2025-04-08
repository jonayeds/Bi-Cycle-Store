import dotenv from "dotenv"
import path from "path"

dotenv.config({path:path.join(process.cwd(),".env")})
export default {
    port :process.env.PORT,
    database_url:process.env.DATABASE_URL, 
    access_secret: process.env.ACCESS_SECRET,
    salt_rounds : process.env.SALT_ROUNDS,
    jwt_access_secret : process.env.JWT_ACCESS_SECRET ,
    jwt_refresh_secret : process.env.JWT_REFRESH_SECRET,
    jwt_access_expires_in : process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expires_in : process.env.JWT_REFRESH_EXPIRES_IN,
    sp:{
        sp_endpoint:process.env.SP_ENDPOINT,
    sp_username:process.env.SP_ENDPOINT,
    sp_password:process.env.SP_ENDPOINT,
    sp_prefix:process.env.SP_ENDPOINT,
    sp_return_url:process.env.SP_ENDPOINT
    },
    stripe_secret:process.env.STRIPE_SECRET_KEY
}


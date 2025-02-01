import dotenv from "dotenv"
import path from "path"

dotenv.config({path:path.join(process.cwd(),".env")})
export default {
    port :process.env.PORT,
    database_url:process.env.DATABASE_URL, 
    access_secret: process.env.ACCESS_SECRET,
    salt_rounds : process.env.SALT_ROUNDS
}


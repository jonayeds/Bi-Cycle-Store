import app from "./app"
import config from "./app/config"
import mongoose from "mongoose"
async function server(){
      try {
        await mongoose.connect(config.database_url as string)
      } catch (error) {
        console.log(error)
      }
      app.listen(config.port, () => {
        console.log(`App listening on port ${config.port}`)
      })

}
server()

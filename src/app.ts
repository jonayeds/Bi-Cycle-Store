import express from 'express'
import { productRouter } from './app/product/product.routes'
import cors from "cors"
const app = express()

// parsers
app.use(express.json())
app.use(cors())


// routes
app.use("/api/products", productRouter)


app.get('/', (req, res) => {
  res.send('Bi-Cycle is Running 🏃‍➡️')
})

export default app
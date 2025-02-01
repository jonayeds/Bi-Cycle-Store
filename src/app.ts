import express from 'express';
import { productRouter } from './app/product/product.routes';
import cors from 'cors';
import { orderRouter } from './app/order/order.routes';
const app = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req, res) => {
  res.send('Bi-Cycle is Running 🏃‍➡️ away');
});

export default app;

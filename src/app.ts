import express from 'express';
import cors from 'cors';
import { router } from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
const app = express();

// parsers
app.use(express.json());
app.use(cors({
  origin:["http://localhost:5173"],
  credentials:true
}));

// routes
app.use("/api/v1", router)

app.get('/', (req, res) => {
  res.send('Bi-Cycle is Running 🏃‍➡️ away');
});

app.use(globalErrorHandler)

export default app;

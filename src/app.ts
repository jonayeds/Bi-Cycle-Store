import express from 'express';
import cors from 'cors';
import { router } from './app/routes';
const app = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1", router)

app.get('/', (req, res) => {
  res.send('Bi-Cycle is Running 🏃‍➡️ away');
});

export default app;

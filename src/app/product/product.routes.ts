import express from 'express';
import { productControllers } from './product.controller';

export const productRouter = express.Router();

// Product Routes
productRouter.post('/', productControllers.createABiCycle);
productRouter.get('/', productControllers.getAllByiCycle);

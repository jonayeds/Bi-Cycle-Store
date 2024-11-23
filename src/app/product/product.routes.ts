import express from 'express';
import { productControllers } from './product.controller';

export const productRouter = express.Router();

// Product Routes
productRouter.post('/', productControllers.createABiCycle);
productRouter.get('/', productControllers.getAllByiCycle);
productRouter.get('/:productId', productControllers.getABiCycle);
productRouter.put('/:productId', productControllers.updateABiCycle);
productRouter.delete('/:productId', productControllers.deleteBiCycle);

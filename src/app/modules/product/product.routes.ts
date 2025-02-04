import express from 'express';
import { productControllers } from './product.controller';
import { auth } from '../../middlewares/auth';


 const productRoutes = express.Router();

// Product Routes
productRoutes.post('/',auth("admin"),  productControllers.createABiCycle);
productRoutes.get('/', productControllers.getAllByiCycle);
productRoutes.get('/:productId', productControllers.getABiCycle);
productRoutes.put('/:productId', productControllers.updateABiCycle);
productRoutes.delete('/:productId', productControllers.deleteBiCycle);

export const ProductRoutes = productRoutes

import express from 'express';
import { productControllers } from './product.controller';
import { auth } from '../../middlewares/auth';
import { user_role } from '../user/user.constant';


 const productRoutes = express.Router();

// Product Routes
productRoutes.post('/',auth(user_role.admin),  productControllers.createABiCycle);
productRoutes.get('/', productControllers.getAllByiCycle);
productRoutes.get('/:productId', productControllers.getABiCycle);
productRoutes.put('/:productId', auth(user_role.admin), productControllers.updateABiCycle);
productRoutes.delete('/:productId', auth(user_role.admin), productControllers.deleteBiCycle);

export const ProductRoutes = productRoutes

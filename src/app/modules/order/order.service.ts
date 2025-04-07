import { JwtPayload } from 'jsonwebtoken';
import { Product } from '../product/product.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

// order a Bi-Cycle
const orderABiCycle = async (order: IOrder, user:JwtPayload) => {
  const product = await Product.findOne({ _id: order.product });
  if (!product?.inStock || product?.quantity - order.quantity < 0) {
    return 'outOfStock';
  }
  order.totalPrice = product.price * order.quantity
  order.customer = user._id
  const result = await Order.create(order);
  await Product.findByIdAndUpdate(
    order.product,
    {
      $inc: { quantity: order.quantity * -1 },
    },
    { new: true },
  );
  if (product.quantity - order.quantity === 0) {
    await Product.findByIdAndUpdate(order.product, { inStock: false }, {new:true});
  }
  return result;
};

// Calculate Revenue
const calculateRevenue = async () => {
  const revenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
    {
      $project: {
        totalRevenue: 1,
        _id: 0,
      },
    },
  ]);
  return revenue[0];
};

export const orderServices = {
  orderABiCycle,
  calculateRevenue,
};

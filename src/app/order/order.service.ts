import { Product } from '../product/product.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const orderABiCycle = async (order: IOrder) => {
  const product = await Product.findOne({ _id: order.product });
  if (!product?.inStock || product?.quantity - order.quantity < 0) {
    return 'outOfStock';
  }
  const result = await Order.create(order);
  await Product.findByIdAndUpdate(
    order.product,
    {
      $inc: { quantity: order.quantity * -1 },
    },
    { new: true },
  );
  if ((product.quantity - order.quantity) === 0) {
    await Product.findByIdAndUpdate(order.product, { inStock: false });
  }
  return result;
};

export const orderServices = {
  orderABiCycle,
};

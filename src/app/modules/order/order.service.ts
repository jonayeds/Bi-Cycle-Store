import { JwtPayload } from 'jsonwebtoken';
import { Product } from '../product/product.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import { makePayment, verifyPaymentUtility } from './order.utils';
import { AppError } from '../../errors/appError';

// order a Bi-Cycle
const orderABiCycle = async (order: IOrder, user:JwtPayload) => {
  const product = await Product.findOne({ _id: order.product });
  if(!product){
    throw new AppError(404,"Product not found")
  }
  if(order.paymentSession === "pending"){
    const newOrder = {
      totalPrice : order.quantity * product.price,
      customer : user._id,
      quantity : order.quantity,
      product: order.product,
      paymentSession:order.paymentSession
    }
    const result = await Order.create(newOrder);
    await Product.findByIdAndUpdate(
      order.product,
      {
        $inc: { quantity: result.quantity * -1 },
      },
      { new: true },
    );
    if (product.quantity - newOrder.quantity === 0) {
      await Product.findByIdAndUpdate(order.product, { inStock: false }, {new:true});
    }
    return result
  }
  const session = await verifyPaymentUtility(order.paymentSession)
  const isOrderExist = await Order.findOne({paymentSession:order.paymentSession})
  if(isOrderExist){
    throw new AppError(400,"Order already placed")
  }
  if(!session || !session?.amount_total){
    throw new AppError(404, "Payment not found!!!")
  }
  if (!product?.inStock || product?.quantity - (session?.amount_total / product.price ) < 0) {
    return 'outOfStock';
  }
  if(session.payment_status === "paid"){
    if(session.amount_total !== product.price* Math.round( session?.amount_total / product.price )){
      throw new AppError(401, "Invalid amount")
    }
    const newOrder = {
      totalPrice : session.amount_total as number,
      customer : user._id,
      quantity : Math.round( session?.amount_total / product.price ),
      product: order.product,
      paymentSession:order.paymentSession
    }
    const result = await Order.create(newOrder);
    await Product.findByIdAndUpdate(
      order.product,
      {
        $inc: { quantity: result.quantity * -1 },
      },
      { new: true },
    );
    if (product.quantity - newOrder.quantity === 0) {
      await Product.findByIdAndUpdate(order.product, { inStock: false }, {new:true});
    }
    return result
  }else{
    throw new AppError(401, "Payment failed!!!")
  }
};


const createPayment =async(order:IOrder, user:JwtPayload)=>{
  const product = await Product.findOne({ _id: order.product });
  if(!product){
    throw new AppError(404,"Product not found")
  }
  order.totalPrice = product.price * order.quantity
  const payment  = await makePayment(product.name, order.totalPrice, user.email, product._id as unknown as string)
  return payment

}


const verifyPayment = async(sessionId:string)=>{
    const session = await verifyPaymentUtility(sessionId)
    if(session.payment_status === "paid"){
      return {}
    }else{
      throw new AppError(402, "Payment is not successfull")
    }
}

const getAllOrders = async()=>{
  const result  = await Order.find().populate("product customer")
  return result
}

const getMyOrders = async(user:JwtPayload)=>{
  const result  = await Order.find({customer:user._id}).populate("product")
  return result
}
const deleteOrder = async(user:JwtPayload, orderId:string)=>{
  const isOrderExists = await Order.findById(orderId)
  if(!isOrderExists){
    throw new AppError(400, "Order not found")
  }
  if(isOrderExists._id.toString() !== orderId){
    throw new AppError(400, "You are not authorized to deleted this order")
  }
  if(isOrderExists.paymentSession !== "pending"){
    throw new AppError(400, "Order is already confirmed")
  }
  const result  = await Order.findByIdAndDelete(orderId)
  return result
}




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
  createPayment,
  verifyPayment,
  getAllOrders,
  getMyOrders,
  deleteOrder
};

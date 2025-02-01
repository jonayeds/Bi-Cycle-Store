import { IProduct } from './product.interface';
import { Product } from './product.model';

const createABiCycle = async (biCycle: IProduct) => {
  const result = Product.create(biCycle);
  return result;
};

const getAllBiCycle = async () => {
  const result = await Product.find();
  return result;
};

const getABiCycle = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateABiCycle = async (productId: string, data: object) => {
  const result = await Product.findByIdAndUpdate(
    { _id: productId },
    { $set: data },
    { new: true },
  );
  return result;
};

const deleteBiCycle = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

export const productServices = {
  createABiCycle,
  getAllBiCycle,
  getABiCycle,
  updateABiCycle,
  deleteBiCycle,
};

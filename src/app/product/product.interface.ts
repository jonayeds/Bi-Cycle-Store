/* eslint-disable no-unused-vars */

import { Model, ObjectId } from 'mongoose';

export interface IProduct {
  name: string;
  brand: string;
  price: number;
  type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
  description: string;
  quantity: number;
  inStock: boolean;
}

// statics
export interface ProductModel extends Model<IProduct> {
  isInStock(id:ObjectId): boolean;
}

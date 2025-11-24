import { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  topSeller?: boolean;
  userId: object;
  categoryId: object;
  createdAt?: Date;
  updatedAt?: Date;
}

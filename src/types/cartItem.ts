import { Document, Types } from "mongoose";

export interface ICartItem extends Document {
  _id: string;
  cartId: object;
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

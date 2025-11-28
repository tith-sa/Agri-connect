import { Document, Types } from "mongoose";

export interface IOrderItem extends Document {
  _id: string;
  orderId: object;
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

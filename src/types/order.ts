import { Document } from "mongoose";

export interface IOrder extends Document {
  _id: string;
  userId: object;
  status: string;
  total: number;
}

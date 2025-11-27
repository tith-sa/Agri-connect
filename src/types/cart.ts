import { Document } from "mongoose";

export interface ICart extends Document {
  _id: String;
  userId: object;
  total: number;
}

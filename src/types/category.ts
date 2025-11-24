import { Document } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
  description: string;
  userId: object;
  createdAt: Date;
  updatedAt: Date;
}

import mongoose, { Document, Types } from "mongoose";
export interface IRole extends Document {
  _id: string;
  name: string;
  userId: object;
  createdAt: Date;
  updatedAt: Date;
}

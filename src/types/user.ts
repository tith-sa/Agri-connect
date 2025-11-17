import mongoose, { Document, Types } from "mongoose";
export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone?: string;
  password: string;
  roles: mongoose.Types.ObjectId[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

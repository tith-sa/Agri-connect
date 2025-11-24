import { Document } from "mongoose";
export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone?: string;
  password: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

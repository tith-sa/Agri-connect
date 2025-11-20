import { Document, Types } from "mongoose";
import { IRole } from "./role";

export interface IUserRole extends Document {
  _Id: string;
  userId: Types.ObjectId;
  roleId: Types.ObjectId | IRole;
}

export interface IUserRolePopulated {
  userId: Types.ObjectId;
  roleId: {
    _id: Types.ObjectId;
    name: string;
  };
}

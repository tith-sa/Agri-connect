import mongoose, { Schema } from "mongoose";
import { IUser } from "@/types/user";

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, unique: true },
    roles: [{ type: Schema.Types.ObjectId, ref: "Role", required: true }],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model<IUser>("user", userSchema);

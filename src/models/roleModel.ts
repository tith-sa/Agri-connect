import mongoose, { Schema } from "mongoose";
import { IRole } from "@/types/role";
const roleModel = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model<IRole>("Role", roleModel);

import mongoose, { Schema } from "mongoose";
import { ICategory } from "@/types/category";

export const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model<ICategory>("Category", categorySchema);

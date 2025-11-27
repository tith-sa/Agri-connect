import mongoose, { Schema } from "mongoose";
import { ICart } from "@/types/cart";

export const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  total: { type: Number, default: 0 },
});

export default mongoose.model<ICart>("Cart", cartSchema);

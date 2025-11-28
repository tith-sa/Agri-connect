import mongoose, { Schema } from "mongoose";
import { IOrder } from "@/types/order";

export const OrderSchema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending",
  },
  total: { type: Number, default: 0 },
});

export default mongoose.model<IOrder>("OrderItemrder", OrderSchema);

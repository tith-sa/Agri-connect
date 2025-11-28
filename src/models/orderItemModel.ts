import mongoose, { Schema } from "mongoose";
import { IOrderItem } from "@/types/orderItem";
import Product from "@/models/productModel";

export const OrderItemSchema = new Schema<IOrderItem>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product,
      required: true,
    },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IOrderItem>("OrderItem", OrderItemSchema);

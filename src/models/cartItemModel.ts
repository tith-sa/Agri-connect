import mongoose, { Schema } from "mongoose";
import { ICartItem } from "@/types/cartItem";
import Product from "@/models/productModel";

export const CartItemSchema = new Schema<ICartItem>(
  {
    cartId: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
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

export default mongoose.model<ICartItem>("CartItem", CartItemSchema);

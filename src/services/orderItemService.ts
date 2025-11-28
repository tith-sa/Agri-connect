import OrderItem from "@/models/orderItemModel";
import { ICartItem } from "@/types/cartItem";

export const orderItemService = {
  addItems: async (orderId: string, items: any[]) => {
    const orderItems = items.map((item) => ({
      orderId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    await OrderItem.insertMany(orderItems);
  },

  // Optional: Remove item (rare)
  removeItem: async (itemId: string) => {
    return await OrderItem.findByIdAndDelete(itemId);
  },
};

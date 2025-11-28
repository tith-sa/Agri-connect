import Order from "@/models/orderModel";
import { orderItemService } from "@/services/orderItemService";

export const orderService = {
  createOrder: async (userId: string, cartItems: any[]) => {
    // Step 1: Create Order
    const order = await Order.create({ userId, total: 0 });

    // Step 2: Add OrderItems
    await orderItemService.addItems(order._id, cartItems);

    // Step 3: Calculate total
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    order.total = total;
    await order.save();

    return order;
  },

  getUserOrders: async (userId: string) => {
    return await Order.find({ userId }).sort({ createdAt: -1 });
  },

  updateStatus: async (orderId: string, status: string) => {
    return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  },
};

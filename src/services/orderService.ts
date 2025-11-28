import Order from "@/models/orderModel";
import OrderItem from "@/models/orderItemModel";
import { orderItemService } from "./orderItemService";
import { ICartItem } from "@/types/cartItem";

export const orderService = {
  createOrder: async (userId: string, cartItems: any[]) => {
    // Step 1: Create Order
    const order = await Order.create({ userId, total: 0 });

    // Step 2: Add OrderItems
    await orderItemService.addItems(order._id, cartItems);

    // Step 3: Calculate total
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    order.total = total;
    await order.save();

    return order;
  },

  getUserOrders: async (userId: string) => {
    const order = await Order.findOne({ userId }).sort({ createdAt: -1 });
    if (!order) return null;

    const orderItems = await OrderItem.find({ orderId: order._id });

    return { order, orderItems };
  },

  updateStatus: async (orderId: string, status: string) => {
    return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  },
};

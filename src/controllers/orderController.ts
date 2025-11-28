import { Request, Response } from "express";
import { orderService } from "@/services/orderService";
import { cartService } from "@/services/cartService";
import { cartItemService } from "@/services/cartItemService";

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management endpoints
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order from user's cart
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Cart is empty
 *       500:
 *         description: Server error
 */

export const createOrderController = async (req: Request, res: Response) => {
  try {
    // Get user's cart items
    const cartItems = await cartService.getCartWithItems(req.user?.userId);
    if (!cartItems || cartItems.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Create order from cart items
    const order = await orderService.createOrder(
      req.user?.userId,
      cartItems.items
    );

    // Clear cart after checkout
    await cartItemService.clearCart(req.user?.userId);

    res.status(201).json({ success: true, data: order });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all orders for the logged-in user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *       500:
 *         description: Server error
 */

export const getUserOrdersController = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getUserOrders(req.user?.userId);
    res.json({ success: true, data: orders });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * @swagger
 * /order/{orderId}/status:
 *   patch:
 *     summary: Update status of an order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Status update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: shipped
 *     responses:
 *       200:
 *         description: Order status updated
 *       500:
 *         description: Server error
 */

export const updateOrderStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const updatedOrder = await orderService.updateStatus(orderId, status);
    res.json({ success: true, data: updatedOrder });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

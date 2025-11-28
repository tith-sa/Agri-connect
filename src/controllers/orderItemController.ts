import { Request, Response } from "express";
import { orderItemService } from "@/services/orderItemService";

/**
 * @swagger
 * tags:
 *   name: OrderItem
 *   description: Manage items inside an order
 */

/**
 * @swagger
 * /order/item/{itemId}:
 *   delete:
 *     summary: Remove an item from an order
 *     tags: [OrderItem]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order item removed successfully
 *       500:
 *         description: Server error
 */

export const removeOrderItemController = async (
  req: Request,
  res: Response
) => {
  try {
    const { itemId } = req.params;
    const deletedItem = await orderItemService.removeItem(itemId);
    res.json({ success: true, data: deletedItem });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

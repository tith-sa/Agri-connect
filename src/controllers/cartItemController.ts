import { cartItemService } from "@/services/cartItemService";
import { Request, Response } from "express";

/**
 * @swagger
 * /cart/item:
 *   post:
 *     summary: Add an item to cart
 *     tags: [CartItem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item added
 */

export const addItemController = async (req: Request, res: Response) => {
  try {
    const result = await cartItemService.addItem(req, res);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/**
 * @swagger
 * /cart/item/update/{itemId}:
 *   put:
 *     summary: Update the quantity of a cart item
 *     tags: [CartItem]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart item quantity updated
 */

export const updateQtyController = async (req: Request, res: Response) => {
  try {
    const result = await cartItemService.updateQuantity(req, res);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/**
 * @swagger
 * /cart/item/remove/{itemId}:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [CartItem]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart item removed
 */
export const removeItemController = async (req: Request, res: Response) => {
  try {
    const result = await cartItemService.removeItem(req.params.itemId);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ message: "internal server error" });
  }
};

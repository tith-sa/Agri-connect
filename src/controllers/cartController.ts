import { cartService } from "@/services/cartService";
import { Request, Response } from "express";

/**
 * @swagger
 * /cart/get:
 *   get:
 *     summary: Get user cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Successful response
 */

export const getCartController = async (req: Request, res: Response) => {
  try {
    const data = await cartService.getCartWithItems(req.user?.userId);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: "internal ser error" });
  }
};

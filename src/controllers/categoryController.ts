import { createCategoryService } from "@/services/categoryService";
import { Request, Response } from "express";
/**
 * @swagger
 * /category/create-category:
 *   post:
 *     tags:
 *       - Category
 *     summary: Create category
 *     description: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               description:
 *                 type: string
 *                 example: Category for electronic products
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

export const createCategoryController = async (req: Request, res: Response) => {
  const result = await createCategoryService(req, res);
  return result;
};

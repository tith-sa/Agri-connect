import { createRoleService } from "@/services/roleService";
import { Request, Response } from "express";

/**
 * @swagger
 * /role/create-role:
 *   post:
 *     tags: [Role]
 *     summary: Create role
 *     description: Create a new role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                type: string
 *                example: admin
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
export const createRoleController = async (req: Request, res: Response) => {
  const result = await createRoleService(req, res);
  return result;
};

import { createUserService } from "@/services/userService";
import { Request, Response } from "express";

/**
 * @swagger
 * /user/create-user:
 *   post:
 *     tags: [User]
 *     summary: Create user
 *     description: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *               - email
 *               - password
 *               - status
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               userName:
 *                 type: string
 *                 example: johndoe123
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 example: secret123
 *               phone:
 *                 type: string
 *                 example: "+85512345678"
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: active
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
export const createUserController = async (req: Request, res: Response) => {
  const result = await createUserService(req, res);
  return result;
};

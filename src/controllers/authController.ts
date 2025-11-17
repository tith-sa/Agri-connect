import e, { Request, Response } from "express";
import {
  loginService,
  logoutService,
  registerService,
} from "@/services/authService";

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register user
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
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
export const registerController = async (req: Request, res: Response) => {
  const result = await registerService(req, res);
  return result;
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     description: login user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *
 *               - email
 *               - password
 *
 *             properties:
 *
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 example: secret123
 *
 *     responses:
 *       200:
 *         description: User login successfully
 *       400:
 *         description: Invalid email or password
 */
export const loginController = async (req: Request, res: Response) => {
  const result = await loginService(req, res);
  return result;
};

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout user
 *     description: Invalidate the user's JWT token or session
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized, invalid or missing token
 */
export const logoutController = async (req: Request, res: Response) => {
  const result = await logoutService(req, res);
  return result;
};

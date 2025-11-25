import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getMeService,
  getUserByIdService,
  updateUserService,
} from "@/services/userService";
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
 *               - phone
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
 *
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

/**
 * @swagger
 * /user/get-users:
 *   get:
 *     tags: [User]
 *     summary: Get all users
 *     description: Retrieve a list of all users with pagination and search
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of users per page (default is 10)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter users by firstName, lastName, userName, or email
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Server error
 */
export const getAllUsersController = async (req: Request, res: Response) => {
  const result = await getAllUsersService(req, res);
  return result;
};

/**
 * @swagger
 * /user/get-me:
 *   get:
 *     tags: [User]
 *     summary: Get current logged-in user
 *     description: Returns the authenticated user's profile information.
 *
 *     responses:
 *       200:
 *         description: Successfully retrieved user information
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */
export const getMeController = async (req: Request, res: Response) => {
  const result = await getMeService(req, res);
  return result;
};

/**
 * @swagger
 * /user/get-user/{id}:
 *   get:
 *     tags: [User]
 *     summary: Get user by ID
 *     description: Retrieve a user by their unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
export const getUserByIdController = async (req: Request, res: Response) => {
  const result = await getUserByIdService(req, res);
  return result;
};

/**
 * @swagger
 * /user/update-user/{id}:
 *   put:
 *     tags:
 *       - User
 *     summary: Update user by ID
 *     description: Update a user's information by their unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

export const updateUserController = async (req: Request, res: Response) => {
  const result = await updateUserService(req, res);
  return result;
};
/**
 * @swagger
 * /user/delete-user/{id}:
 *   delete:
 *     tags: [User]
 *     summary: Delete user by ID
 *     description: Delete a user by their unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
export const deleteUserController = async (req: Request, res: Response) => {
  const result = await deleteUserService(req, res);
  return result;
};

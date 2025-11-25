import { Request, Response } from "express";
import {
  createProductService,
  deletedProduct,
  getAllProductsService,
  getProductById,
  getUserProductsService,
  updateProductService,
} from "@/services/productService";

/**
 * @swagger
 * /product/create-product:
 *   post:
 *     tags:
 *       - Product
 *     summary: Create product
 *     description: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 13
 *               description:
 *                 type: string
 *                 example: Latest Apple iPhone model
 *               price:
 *                 type: number
 *                 example: 999.99
 *               stock:
 *                 type: number
 *                 example: 50
 *               categoryId:
 *                 type: string
 *                 example: 60d21b4667d0d8992e610c85
 *               topSeller:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
export const createProductController = async (req: Request, res: Response) => {
  const result = await createProductService(req, res);
  return result;
};

/**
 * @swagger
 * /product/get-products:
 *   get:
 *     tags: [Product]
 *     summary: Get all products
 *     description: Retrieve a list of all products with pagination and search
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
 *         description: Number of products per page (default is 10)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter products by name
 *     responses:
 *       200:
 *         description: A list of products
 *       500:
 *         description: Server error
 */

export const getAllProductsController = async (req: Request, res: Response) => {
  const result = await getAllProductsService(req, res);
  return result;
};

/**
 * @swagger
 * /product/get-user-products:
 *   get:
 *     tags: [Product]
 *     summary: Get all products
 *     description: Retrieve a list of all products with pagination and search
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
 *         description: Number of products per page (default is 10)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter products by name
 *     responses:
 *       200:
 *         description: A list of products
 *       500:
 *         description: Server error
 */
export const getUserProductsController = async (
  req: Request,
  res: Response
) => {
  const result = await getUserProductsService(req, res);
  return result;
};

/**
 * @swagger
 * /product/get-product/{id}:
 *   get:
 *     tags: [Product]
 *     summary: Get product by ID
 *     description: Retrieve a product by their unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
export const getProductByIdController = async (req: Request, res: Response) => {
  const result = await getProductById(req, res);
  return result;
};

/**
 * @swagger
 * /product/update-product/{id}:
 *   put:
 *     tags:
 *       - Product
 *     summary: Update product by ID
 *     description: updated product information
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
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 13
 *               description:
 *                 type: string
 *                 example: Latest Apple iPhone model
 *               price:
 *                 type: number
 *                 example: 999.99
 *               stock:
 *                 type: number
 *                 example: 50
 *               categoryId:
 *                 type: string
 *                 example: 60d21b4667d0d8992e610c85
 *               topSeller:
 *                 type: boolean
 *                 example: false
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
export const updateProductController = async (req: Request, res: Response) => {
  const result = await updateProductService(req, res);
  return result;
};

/**
 * @swagger
 * /product/delete-product/{id}:
 *   delete:
 *     tags: [Product]
 *     summary: Delete product by ID
 *     description: Delete a product by their unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
export const deleteProductController = async (req: Request, res: Response) => {
  const result = await deletedProduct(req, res);
  return result;
};

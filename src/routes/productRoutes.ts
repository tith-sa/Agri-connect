import express from "express";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  getUserProductsController,
  updateProductController,
} from "@/controllers/productController";
import { authenicate, authorize } from "@/middleware/authMiddleware";

const router = express.Router();

router.post(
  "/create-product",
  authenicate,
  authorize(["farmer"]),
  createProductController
);
router.get(
  "/get-products",
  authenicate,
  authorize(["admin", "customer"]),
  getAllProductsController
);
router.get(
  "/get-user-products",
  authenicate,
  authorize(["farmer"]),
  getUserProductsController
);

router.get(
  "/get-product/:id",
  authenicate,

  getProductByIdController
);
router.put(
  "/update-product/:id",
  authenicate,
  authorize(["farmer"]),
  updateProductController
);
router.delete(
  "/delete-product/:id",
  authenicate,
  authorize(["admin", "farmer"]),
  deleteProductController
);

export default router;

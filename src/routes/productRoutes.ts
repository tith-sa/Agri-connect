import express from "express";
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  getUserProductsController,
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

router.get("/get-product/:id", authenicate, getProductByIdController);

export default router;

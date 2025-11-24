import { createCategoryController } from "@/controllers/categoryController";
import express from "express";
import { authenicate, authorize } from "@/middleware/authMiddleware";

const router = express.Router();

router.post(
  "/create-category",
  authenicate,
  authorize(["admin"]),
  createCategoryController
);

export default router;

import { createRoleController } from "@/controllers/roleController";
import { authenicate, authorize } from "@/middleware/authMiddleware";
import express from "express";

const router = express.Router();

router.post(
  "/create-role",
  authenicate,
  authorize(["admin"]),
  createRoleController
);
export default router;

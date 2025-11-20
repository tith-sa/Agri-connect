import express from "express";
import { createUserController } from "@/controllers/userController";
import { authenicate, authorize } from "@/middleware/authMiddleware";

const router = express.Router();

router.post(
  "/create-user",
  authenicate,
  authorize(["admin"]),
  createUserController
);
export default router;

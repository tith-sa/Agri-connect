import express from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "@/controllers/authController";
import { authenicate } from "@/middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", authenicate, logoutController);
export default router;

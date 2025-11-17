import express from "express";
import { createUserController } from "@/controllers/userController";
import { authenicate } from "@/middleware/authMiddleware";

const router = express.Router();

router.post("/create-user", authenicate, createUserController);
export default router;

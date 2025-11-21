import express from "express";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from "@/controllers/userController";
import { authenicate, authorize } from "@/middleware/authMiddleware";

const router = express.Router();

router.post(
  "/create-user",
  authenicate,
  authorize(["admin"]),
  createUserController
);
router.get(
  "/get-users",
  authenicate,
  authorize(["admin"]),
  getAllUsersController
);
router.get(
  "/get-user/:id",
  authenicate,
  authorize(["admin"]),
  getUserByIdController
);
router.put(
  "/update-user/:id",
  authenicate,
  authorize(["admin"]),
  updateUserController
);
router.delete(
  "/delete-user/:id",
  authenicate,
  authorize(["admin"]),
  deleteUserController
);
export default router;

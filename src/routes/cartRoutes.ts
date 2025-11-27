import { getCartController } from "@/controllers/cartController";
import {
  addItemController,
  removeItemController,
  updateQtyController,
} from "@/controllers/cartItemController";
import { authenicate, authorize } from "@/middleware/authMiddleware";
import express from "express";

const router = express.Router();

router.post("/item", authenicate, authorize(["customer"]), addItemController);
router.get("/get", authenicate, authorize(["customer"]), getCartController);
router.put(
  "/item/update/:itemId",
  authenicate,
  authorize(["customer"]),
  updateQtyController
);
router.delete(
  "/item/remove/:itemId",
  authenicate,
  authorize(["customer"]),
  removeItemController
);

export default router;

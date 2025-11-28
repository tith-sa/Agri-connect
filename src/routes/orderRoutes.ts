import express from "express";
import { authenicate, authorize } from "@/middleware/authMiddleware";
import {
  createOrderController,
  getUserOrdersController,
  updateOrderStatusController,
} from "@/controllers/orderController";
import { removeOrderItemController } from "@/controllers/orderItemController";

const router = express.Router();

router.post("/", authenicate, authorize(["customer"]), createOrderController);
router.get("/", authenicate, authorize(["customer"]), getUserOrdersController);
router.patch(
  "/:orderId/status",
  authenicate,
  authorize(["customer"]),
  updateOrderStatusController
);
router.delete("/item/:itemId", removeOrderItemController);

export default router;

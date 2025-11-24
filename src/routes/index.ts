import { Router } from "express";
import authRoute from "./authRoutes";
import roleRoute from "./roleRoutes";
import userRoute from "./userRoutes";
import categoryRoute from "./categoryRoutes";
import productRoute from "./productRoutes";

const router = Router();

router.use("/auth", authRoute);
router.use("/role", roleRoute);
router.use("/user", userRoute);
router.use("/category", categoryRoute);
router.use("/product", productRoute);

export default router;

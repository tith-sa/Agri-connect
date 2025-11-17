import { Router } from "express";
import authRoute from "./authRoutes";
import roleRoute from "./roleRoutes";
import userRoute from "./userRoutes";

const router = Router();

router.use("/auth", authRoute);
router.use("/role", roleRoute);
router.use("/user", userRoute);

export default router;

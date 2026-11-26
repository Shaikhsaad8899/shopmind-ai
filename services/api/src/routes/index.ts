import { Router } from "express";
import healthRoutes from "./health.routes.js";

const router = Router();

router.use("/health", healthRoutes);

export default router;
// Upcoming routes

// router.use("/auth", authRoutes);
// router.use("/users", userRoutes);
// router.use("/products", productRoutes);
// router.use("/orders", orderRoutes);
// router.use("/cart", cartRoutes);
// router.use("/payments", paymentRoutes);
// router.use("/ai", aiRoutes);
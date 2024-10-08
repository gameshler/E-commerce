import { Router } from "express";
import productRoutes from "./product.mjs";
import collectionRoutes from "./collections.mjs";
import cartRoutes from "./cart.mjs";
import credentialsRoutes from "./credentials.mjs";
import imageRoute from "./images.mjs";
import userRoute from "./user.mjs";
import statusRoutes from "./status.mjs";
import chartRoutes from "./charts.mjs";
const router = Router();

router.use("/product", productRoutes);
router.use("/collections", collectionRoutes);
router.use("/cart", cartRoutes);
router.use("/auth", credentialsRoutes);
router.use("/images", imageRoute);
router.use("/user", userRoute);
router.use("/status", statusRoutes);
router.use("/charts", chartRoutes);

export default router;

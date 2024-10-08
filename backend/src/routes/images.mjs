import { Router } from "express";
import uploadProduct from "../middlewares/imageUpload.mjs";
import { validateJwt } from "../middlewares/validations.mjs";

const router = Router();

router.post("/upload", validateJwt, uploadProduct);

export default router;

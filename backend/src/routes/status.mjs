import { Router } from "express";
import { isAdmin, isUser } from "../middlewares/Rights.mjs";
const router = Router();

router.get("/checkadmin", isAdmin);
router.get("/checkuser", isUser);
export default router;

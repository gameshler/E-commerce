import { Router } from "express";
import { Login, Logout, Signup } from "../controllers/credentials.mjs";
import { validateBody } from "../middlewares/validations.mjs";
import { loginSchema, signupSchema } from "../mongoose/schemas/credentials.mjs";
import loginLimiter from "../middlewares/rateLimit.mjs";
const router = Router();

router.get("/logout", Logout);
router.post("/signup", validateBody(signupSchema), Signup);
router.post(
  "/login",
  validateBody(loginSchema),
  loginLimiter,
  Login
);

export default router;

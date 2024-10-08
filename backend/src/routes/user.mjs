import { Router } from "express";
import { getUsers } from "../controllers/user.mjs";
import { validateJwt } from "../middlewares/validations.mjs";

const router = Router();

router.get("/getusers", validateJwt, getUsers);

export default router;

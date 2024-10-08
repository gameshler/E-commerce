import { Router } from "express";
import {
  getCollection,
  getPopularInWoman,
} from "../controllers/collections.mjs";
import { validateJwt } from "../middlewares/validations.mjs";
const router = Router();

router.get("/newcollection", validateJwt, getCollection);
router.get("/popularinwoman", validateJwt, getPopularInWoman);

export default router;

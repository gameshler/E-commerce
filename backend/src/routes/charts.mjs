import { Router } from "express";
import {
  getProuductsAvailablity,
  getAvailableUsers,
  getProductsByCategory,
} from "../controllers/charts.mjs";
import { validateJwt } from "../middlewares/validations.mjs";
const router = Router();

router.get("/productsavailable", validateJwt, getProuductsAvailablity);
router.get("/usersavailable", validateJwt, getAvailableUsers);
router.get("/productsbycategory", validateJwt, getProductsByCategory);

export default router;

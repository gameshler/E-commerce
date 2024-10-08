import { Router } from "express";
import {
  addProduct,
  editProduct,
  getProducts,
  removeProduct,
  searchProducts,
} from "../controllers/product.mjs";
import { validateQuery, validateJwt } from "../middlewares/validations.mjs";
import { searchSchema } from "../mongoose/schemas/search.mjs";
const router = Router();

router.post("/addproduct", validateJwt, addProduct);
router.delete("/removeproduct", validateJwt, removeProduct);
router.put("/editproduct", validateJwt, editProduct);
router.get("/allproducts", validateJwt, getProducts);
router.get("/search", validateJwt, validateQuery(searchSchema), searchProducts);

export default router;

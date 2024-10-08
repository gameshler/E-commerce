import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.mjs";
import { validateBody, validateJwt } from "../middlewares/validations.mjs";
import { cartSchema } from "../mongoose/schemas/cart.mjs";
const router = Router();

router.get("/getcart", validateJwt, getCart);
router.post(
  "/removefromcart",
  validateJwt,
  validateBody(cartSchema),
  removeFromCart
);
router.post("/addtocart", validateJwt, validateBody(cartSchema), addToCart);

export default router;

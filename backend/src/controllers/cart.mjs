import { User } from "../mongoose/schemas/user.mjs";
import errorHandler from "../handlers/error.mjs";

const addToCart = async (request, response) => {
  try {
    const { productId, userId } = request.body;

    let cartData;

    if (userId) {
      const user = await User.findById(userId);

      if (!user) {
        return response
          .status(404)
          .json({ ok: false, message: "User not found" });
      }

      cartData = user.cartData;
    } else {
      if (!request.session.cartData) {
        request.session.cartData = [];
      }
      cartData = request.session.cartData;
    }

    const isProductInCart = cartData.some(
      (item) => item.productId === productId
    );

    if (isProductInCart) {
      return response
        .status(400)
        .json({ ok: false, message: "Product already exists in the cart" });
    }

    cartData.push({ productId });

    if (userId) {
      await User.findByIdAndUpdate(userId, { cartData });
    } else {
      await request.session.save();
    }

    return response
      .status(200)
      .json({ ok: true, message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Failed to add product to cart", error);
    errorHandler(error, request, response);
  }
};

const removeFromCart = async (request, response) => {
  try {
    const { productId, userId } = request.body;

    let cartData;

    if (userId) {
      const user = await User.findById(userId);

      if (!user) {
        return response
          .status(404)
          .json({ ok: false, message: "User not found" });
      }

      cartData = user.cartData;
    } else {
      cartData = request.session.cartData || [];

      if (!cartData.length) {
        return response
          .status(404)
          .json({ ok: false, message: "Cart is empty" });
      }
    }

    const productIndex = cartData.findIndex(
      (item) => item.productId === productId
    );

    if (productIndex === -1) {
      return response
        .status(400)
        .json({ ok: false, message: "Product not found in the cart" });
    }

    cartData.splice(productIndex, 1);

    if (userId) {
      await User.findByIdAndUpdate(userId, { cartData });
    } else {
      await request.session.save();
    }

    return response
      .status(200)
      .json({ ok: true, message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Failed to remove product from cart", error);
    errorHandler(error, request, response);
  }
};

const getCart = async (request, response) => {
  try {
    const { userId } = request.body;
    let cartData;

    if (userId) {
      const user = await User.findById(userId);

      if (!user) {
        return response
          .status(404)
          .json({ ok: false, message: "User not found" });
      }

      cartData = user.cartData;
    } else {
      cartData = request.session.cartData || [];
    }

    return response.status(200).json({ ok: true, cartData });
  } catch (error) {
    console.error("Failed to get cart", error);
    errorHandler(error, request, response);
  }
};

export { addToCart, removeFromCart, getCart };

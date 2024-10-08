import errorHandler from "../handlers/error.mjs";
import { Product } from "../mongoose/schemas/product.mjs";
import { User } from "../mongoose/schemas/user.mjs";

const getProuductsAvailablity = async (request, response) => {
  try {
    const products = [
      {
        $group: { _id: "$available", products: { $sum: 1 } },
      },
    ];
    const result = await Product.aggregate(products);
    response.json({ ok: true, result });
  } catch (error) {
    console.error("Failed to Get Prouducts In Stock", error);
    errorHandler(error, request, response);
  }
};

const getAvailableUsers = async (request, response) => {
  try {
    const users = await User.countDocuments({ role: "user" });
    response.json({ ok: true, users });
  } catch (error) {
    console.error("Failed to Get Available Users", error);
    errorHandler(error, request, response);
  }
};

const getProductsByCategory = async (request, response) => {
  try {
    const products = [{ $group: { _id: "$category", products: { $sum: 1 } } }];
    const result = await Product.aggregate(products);
    response.json({ ok: true, result });
  } catch (error) {
    console.error("Failed to Get Products By Category", error);
    errorHandler(error, request, response);
  }
};

export { getProuductsAvailablity, getAvailableUsers, getProductsByCategory };

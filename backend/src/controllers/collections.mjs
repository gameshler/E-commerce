import { Product } from "../mongoose/schemas/product.mjs";
import errorHandler from "../handlers/error.mjs";
const getCollection = async (request, response) => {
  try {
    const products = await Product.find();
    const newCollection = products.slice(1).slice(-8);
    response.json({
      newCollection,
    });
  } catch (error) {
    console.error(error, "Failed to Get Collection");
    errorHandler(error, request, response);
  }
};

const getPopularInWoman = async (request, response) => {
  try {
    const products = await Product.find({ category: "Women" });
    const popular = products.slice(0, 4);

    response.json(popular);
  } catch (error) {
    console.error(error, "Failed to Get Popular In Woman");
    errorHandler(error, request, response);
  }
};

export { getCollection, getPopularInWoman };

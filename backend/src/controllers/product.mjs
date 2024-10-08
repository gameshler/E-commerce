import { Product } from "../mongoose/schemas/product.mjs";
import errorHandler from "../handlers/error.mjs";

const addProduct = async (request, response) => {
  try {
    const { name, image, category, new_price, old_price } = request.body;
    const product = new Product({
      name,
      image,
      category,
      new_price,
      old_price,
    });
    await product.save();

    response.status(201).json({
      ok: true,
      message: "Product Added Successfully",
      data: product,
    });
  } catch (error) {
    console.error("Failed to Add Product", error);
    errorHandler(error, request, response);
  }
};

const removeProduct = async (request, response) => {
  try {
    await Product.findOneAndDelete({ id: request.body._id });
    response.json({
      ok: true,
      name: request.body.name,
    });
  } catch (error) {
    console.error(error, "Failed to Remove Product");
    errorHandler(error, request, response);
  }
};

const editProduct = async (request, response) => {
  try {
    const { _id, name, image, category, new_price, old_price } = request.body;
    const updatedProduct = await Product.findOneAndUpdate(
      { _id },
      { name, image, category, new_price, old_price },
      { new: true }
    );

    if (!updatedProduct) {
      return response.status(404).json({
        ok: false,
        message: "Product Not Found",
      });
    }
    return response.json({
      ok: true,
      message: "Product Updated",
    });
  } catch (error) {
    console.error(error, "Failed to Edit Product");
    errorHandler(error, request, response);
  }
};

const getProducts = async (request, response) => {
  try {
    const products = await Product.find();
    response.json({
      ok: true,
      products,
    });
  } catch (error) {
    console.error(error, "Failed to Get Products");
    errorHandler(error, request, response);
  }
};

const searchProducts = async (request, response) => {
  try {
    const products = await Product.find({
      name: { $regex: new RegExp(request.query.q, "i") },
    });
    response.json({
      ok: true,
      products,
    });
  } catch (error) {
    console.error(error, "Failed to Search Products");
    errorHandler(error, request, response);
  }
};

export { addProduct, removeProduct, editProduct, getProducts, searchProducts };

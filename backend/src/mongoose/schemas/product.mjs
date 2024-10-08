import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  image: {
    type: mongoose.Schema.Types.String,
    required: true,
    default: "",
  },
  category: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  new_price: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  old_price: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  date: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
  },
  available: {
    type: mongoose.Schema.Types.Boolean,
    default: true,
  },
});

export const Product = mongoose.model("Product", ProductSchema);

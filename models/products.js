import mongoose from "mongoose";

const productCollection = "Products";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: Boolean,
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

export const productModel = mongoose.model(productCollection, productSchema);

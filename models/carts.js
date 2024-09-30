import mongoose from "mongoose";

const cartCollection = "Carts";

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1
      }
    },
  ],
});

export const cartModel = mongoose.model(cartCollection, cartSchema);

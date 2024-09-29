import { cartModel } from "../models/carts.js";
import { productModel } from "../models/products.js";

export default class Cart {
  constructor() {}

  getCarts = async () => {
    const carts = await cartModel.find();
    return carts;
  };

  getCartByiD = async (cartId) => {
    try {
      const encontrado = await cartModel.findById(cartId);
      if (encontrado) {
        return encontrado;
      } else {
        return `El carrito con ID ${cartId} no se encuentra en la coleccion`;
      }
    } catch (error) {
      throw error;
    }
  };

  saveCart = async (cart) => {
    try {
      const newCart = await cartModel.create(cart);
      return newCart;
    } catch (error) {
      throw error;
    }
  };

  addToCart = async (cartId, productId) => {
    try {
      const cart = await cartModel.findById(cartId);
      const product = await productModel.findById(productId);

      if (product) {
        cart.products.push({ _id: productId });
        await cartModel.updateOne({ _id: cartId }, cart);
      } else {
        return `No se encontro el producto con ID ${productId}`;
      }
    } catch (error) {
      throw error;
    }
  };

  deleteCart = async (cartId) => {
    try {
      const deleted = await cartModel.deleteOne({_id: cartId})
      return deleted
    } catch (error) {
      throw error
    }
  }

}



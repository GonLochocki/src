import { cartModel } from "../models/carts.js";
import { productModel } from "../models/products.js";

export default class Cart {
  constructor() {}

  getCarts = async () => {
    const carts = await cartModel.find().populate("products.product");
    return carts;
  };

  getCartByiD = async (cartId) => {
    try {
      const foundCart = await cartModel
        .findById(cartId)
        .populate("products.product").lean();
      if (foundCart) {
        return foundCart;
      } else {
        throw new Error(`El carrito con ID ${cartId} no se encuentra en la colección`);
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
        const existingProduct = cart.products.find(
          (p) => p.product.toString() === productId
        );
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.products.push({ product: productId, quantity: 1 });
        }
        await cart.save();
      } else {
        return `No se encontro el producto con ID ${productId}`;
      }
    } catch (error) {
      throw error;
    }
  };

  deleteProductFromCart = async (cartId, productId) => {

    try {
      const cart = await cartModel.findById(cartId);

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      cart.products = cart.products.filter(
       (p) => p.product.toString() !== productId       
      );

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  };

  updateCart = async (cartId, productsArray) => {
    try {
      for (let item of productsArray) {
        const productExists = await productModel.findById(item.product);
        if (!productExists) {
          return `El producto con ID ${item.product} no existe`;
        }
      }

      const updatedCart = await cartModel
        .findByIdAndUpdate(
          cartId,
          { products: productsArray },
          { new: true, runValidators: true }
        )
        .populate("products.product");

      return updatedCart;
    } catch (error) {
      throw error;
    }
  };

  updateProductQuantity = async (cartId, productId, quantity) => {
    try {
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        return `El carrito con ID ${cartId} no existe`;
      }

      const product = cart.products.find(
        (p) => p.product.toString() === productId
      );
      if (!product) {
        return `El producto con ID ${productId} no está en el carrito`;
      }
      
      product.quantity = quantity;

      await cart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  };

  deleteCart = async (cartId) => {
   try {

    const cart = await cartModel.findById(cartId)
    cart.products = ""
    cart.save()
    return cart
    
   } catch (error) {
    throw error
   }
  };
}

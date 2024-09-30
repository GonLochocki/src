import { Router } from "express";
import CartManager from "../managers/cartManager.js";

const router = Router();
const cm = new CartManager();

router.get("/", async (req, res) => {
  try {
    const carts = await cm.getCarts();
    res.send({ status: "success", payload: carts });
  } catch (error) {
    console.log(error.message);
    res.send({ status: "error", message: "Error al obtener los carritos" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cm.getCartByiD(cid);
    res.send({ status: "success", payload: cart });
  } catch (error) {
    console.log(error.message);
    res.send({ status: "error", message: "Error al obtener el carrito" });
  }
});

router.post("/", async (req, res) => {
  try {
    const cart = cm.saveCart({ products: [] });
    res.send({ status: "success", payload: cart });
  } catch (error) {
    console.log(error.message);
    res.send({ status: "error", message: "Error al crear el carrito" });
  }
});

router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const productsArray = req.body.products; 
    const updatedCart = await cm.updateCart(cid, productsArray);
    res.send({ status: "success", payload: updatedCart });
  } catch (error) {
    console.log(error.message);
    res.send({ status: "error", message: "Error al actualizar el carrito" });
  }
});

router.put("/:cid/:pid", async (req, res) => {
  const {cid, pid} = req.params
  await cm.addToCart(cid, pid)
  res.send({status: "success"})
})

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined) {
      return res.send({
        status: "error",  message: "Se requiere el campo quantity en el body",
      });
    }
    const updatedCart = await cm.updateProductQuantity(cid, pid, quantity);
    res.send({ status: "success", payload: updatedCart });
  } catch (error) {
    console.log(error.message);
    res.send({status: "error",  message: "Error al actualizar la cantidad del producto en el carrito",
    });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const deleted = await cm.deleteCart(cid);
    res.send({ status: "success", payload: deleted });
  } catch (error) {
    console.log(error.message);
  }

  router.delete("/:cid/products/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const deletedProduct = await cm.deleteProductFromCart(cid, pid);
      res.send({ status: "success", payload: deletedProduct });
    } catch (error) {
      console.log(error.message);
      res.send({ status: "error", message: "Error al eliminar el producto del carrito" });
    }
  }); 
  
  
});

export default router;

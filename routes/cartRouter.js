import { Router } from "express";
import CartManager from "../managers/cartManager.js";

const router = Router();
const cm = new CartManager();

router.get("/", async (req, res) => {
  const carts = await cm.getCarts();
  res.send({ status: "success", payload: carts });
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cm.getCartByiD(cid);
  res.send({ status: "success", payload: cart });
});

router.post("/", async (req, res) => {
  try {
    
    const cart = cm.saveCart(req.body)
    
    res.send({ status: "success", payload: cart });
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:cid/:pid", async (req, res) => {
    try {

        const cartId = req.params.cid
        const productId = req.params.pid
        await cm.addToCart(cartId, productId)
        res.send({status: "success"})
        
    } catch (error) {
        console.log(error.message);
    }

})

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const deleted = await cm.deleteCart(cid);
    res.send({ status: "success", payload: deleted });
  } catch (error) {
    console.log(error.message);
  }
});


export default router
import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import CartManager from "../managers/cartManager.js";

const router = Router();
const pm = new ProductManager();
const cm = new CartManager();


router.get("/products", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort; 
        const query = req.query.query; 
               
        const products = await pm.getAll({ limit, page, sort, query });       
        
        
        
       
        res.render("index", {
            products: products.docs,
            totalPages: products.totalPages,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            limit,
            sort,
            query,
            pm                
        });
    } catch (error) {
        console.error(error);
        res.send("Error al renderizar la página de productos");
    }
});

router.get("/:cid", async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cm.getCartByiD(cid);
      res.render("cart", { cart });
    } catch (error) {
      console.error(error);
      res.send("Error al renderizar la página del carrito");
    }
  });


export default router;

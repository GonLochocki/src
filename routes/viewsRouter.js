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

       
        const result = await pm.getAll({ limit, page, sort, query });

       
        res.render("index", {
            products: result.docs,
            totalPages: result.totalPages,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            limit,
            sort,
            query
        });
    } catch (error) {
        console.error(error);
        res.send("Error al renderizar la página de productos");
    }
});


router.get("/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await pm.getById(pid);
        if (typeof product === "string") {
            res.send("Producto no encontrado");
        } else {
           
            const limit = parseInt(req.query.limit) || 10;
            const page = parseInt(req.query.page) || 1;
            const sort = req.query.sort;
            const query = req.query.query;

            res.render("productDescription", {
                product,
                totalPages: 1, 
                page: 1,
                hasPrevPage: false,
                hasNextPage: false,
                prevPage: null,
                nextPage: null,
                limit,
                sort,
                query
            });
        }
    } catch (error) {
        console.error(error);
        res.send("Error al renderizar la página de detalles del producto");
    }
});


router.get("/carts/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cm.getCartByiD(cid);
        if (typeof cart === "string") {
            res.send(cart);
        } else {
            
            const total = cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
            res.render("cart", { cart, total });
        }
    } catch (error) {
        console.error(error);
        res.send("Error al renderizar la página del carrito");
    }
});


router.get("/", (req, res) => {
    res.redirect("/products");
});

export default router;

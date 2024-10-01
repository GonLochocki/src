import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const router = Router();
const pm = new ProductManager();


router.get("/", async (req, res) => {
  try {
    
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort; 
    const query = req.query.query; 
    
    const products = await pm.getAll({ limit, page, sort, query });    
    const cartId = "66faf3aff7f22a928464469f"

    res.send({
      status: "success",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.prevPage,
      nextLink: products.nextPage,
      cartId
    });
   

  } catch (error) {
    console.error(error);
    res.send({ status: "error", message: "Error al obtener los productos" });
  }
});



router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await pm.getById(pid);
  res.send({ status: "success", payload: product });
});

router.post("/", async (req, res) => {
  try {
    const product = await pm.saveproducts(req.body);
    res.send({ status: "success", payload: product });
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const  {pid}  = req.params;
    const newData = req.body;
    const updatedProduct = await pm.updateproduct(pid, newData);
    res.send({ status: "success", payload: updatedProduct });
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const deleted = await pm.deleteproduct(pid);
    res.send({ status: "success", payload: deleted });
  } catch (error) {
    console.log(error.message);
  }
});

export default router;

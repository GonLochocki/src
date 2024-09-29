import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const router = Router();
const pm = new ProductManager();

router.get("/", async (req, res) => {
  const products = await pm.getAll();
  res.send({ status: "success", payload: products });
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

import express from "express";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import productsRouter from "./routes/productsRouter.js"
import cartsRouter from "./routes/cartRouter.js"

const app = express();
const PORT = 8080;

const connection = mongoose.connect(
  "mongodb+srv://gonlochocki:MongoDb123@cluster0.xbuwa.mongodb.net/Ecommerce"
);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

app.listen(PORT, () => {
  console.log(`Conectado al puerto ${PORT}`);
});


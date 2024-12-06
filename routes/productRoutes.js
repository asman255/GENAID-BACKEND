import express from "express";
import {
  getCardProductList,
  getCardProductRead,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get('/products', getCardProductList);
ProductRouter.get('/products/:id', getCardProductRead);

export default productRouter;

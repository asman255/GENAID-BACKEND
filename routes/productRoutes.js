import express from "express";
import {
  getProductList,
  getProductRead,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get('/', getProductList);
productRouter.get('/:id', getProductRead);

export default productRouter;

import express from "express";
import {
  getCardProductList,
  getCardProductRead,
} from "../controllers/CardProdcutControl.js";

const cardProductRouter = express.Router();

cardProductRouter.get('/card-products', getCardProductList);
cardProductRouter.get('/card-products/:id', getCardProductRead);

export default cardProductRouter;

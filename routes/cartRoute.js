import express from "express";
import {
  addToCart,
  updateCart,
  delCart,
  getCart,
} from "../controllers/cartColtroller.js";
const cartRouter = express.Router();

cartRouter.get("/get", getCart);
cartRouter.post("/add", addToCart);
cartRouter.put("/update", updateCart);
cartRouter.delete("/delete", delCart);

export default cartRouter;

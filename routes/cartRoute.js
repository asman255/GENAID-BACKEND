import express from "express";
import userAuth from "../middlewares/userAuth.js";
import {
  addToCart,
  updateCart,
  delCart,
  getCart,
} from "../controllers/cartColtroller.js";
const cartRouter = express.Router();

cartRouter.post("/get", userAuth, getCart);
cartRouter.post("/add", userAuth, addToCart);
cartRouter.put("/update", userAuth, updateCart);
cartRouter.post("/delete", userAuth, delCart);

export default cartRouter;

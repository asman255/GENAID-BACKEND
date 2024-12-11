import express from "express";
import { addToCart,updateCart,delCart } from "../controllers/cartColtroller.js";
const cartRouter = express.Router();

cartRouter.get("/get", );
cartRouter.post("/add",addToCart );
cartRouter.put("/update",updateCart );
cartRouter.delete("/delete",delCart)

export default cartRouter;
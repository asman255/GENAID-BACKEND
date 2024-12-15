import express from "express";
import userAuth from "../middlewares/userAuth.js";
import { userOrder,createOrder } from "../controllers/orderController.js";


const orderRouter = express.Router();

// //admin routes
// orderRouter.post("/list" )
// orderRouter.post("/status" )

//payment routes
// orderRouter.post("/stripe" )


//user routes
orderRouter.post("/orders",userAuth,userOrder )
orderRouter.post("/checkout",userAuth,createOrder )

//verify payment routes
// orderRouter.post("/verifyStripe" )

export default orderRouter;
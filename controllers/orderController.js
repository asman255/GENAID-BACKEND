import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const currency = "thb"
const deliveryCharge = 40;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// order  data for  frontend
 const userOrder = async (req, res) => {
    try {
        const { userId } = req.body;
        const order = await orderModel.find({ userId });
        res.json({ success: true, order });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
 };



 export { userOrder };
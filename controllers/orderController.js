import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const currency = "thb";
const deliveryCharge = 10;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// order  data for  frontend
const userOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const order = await orderModel.find({ userId });
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const createOrder = async (req, res) => {

  try {
    const {
      data: { Item, address, paymentMethod, total },
    } = req.body;
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const discount = 0; // assuming no discount
    const vat = 0; //total * 0.07; // assuming 7% VAT
    const paymentTime = ""; // new Date().toISOString();
    const shipTime = ""; // assuming no ship time initially
    const date = new Date().toISOString();
    const orderCount = await orderModel.countDocuments();
    const orderId = `order-${new Date().getFullYear()}${('000000' + (orderCount + 1)).slice(-6)}`;

    const order = await orderModel.create({
      orderId,
      userId,
      totalPrice: total,
      discount,
      deliveryCharge,
      vat,
      Item,
      address,
      status: "รอชำระ",
      paymentMethod,
      payment: false,
      paymentTime,
      shipTime,
      date,
    });

    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



const orderHistory = async (req, res) => {
  const orderId = req.params.id;
  console.log(req.params);
  try {
    const order = await orderModel.findOne({ orderId }); // assuming you have an orderModel
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


export { userOrder,createOrder,orderHistory };


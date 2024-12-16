import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const currency = "thb";
const deliveryCharge = 40;

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
    const { userId, Item, address, paymentMethod } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const totalPrice = Item.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = 0; // assuming no discount
    const vat = totalPrice * 0.07; // assuming 7% VAT
    const paymentTime = ""//new Date().toISOString();
    const shipTime = ""; // assuming no ship time initially
    const date = new Date().toISOString();

    const order = await orderModel.create({
      userId,
      totalPrice,
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

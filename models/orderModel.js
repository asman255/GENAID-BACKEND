import  Mongoose  from "mongoose";


const orderSchema = new Mongoose.Schema({
    userId:{type: String, required: true},
    orderId:{type: String, required: true},
    Item:{type: Array, required: true},
    amount:{type: Number, required: true},
    address:{type: String, required: true},
    status:{type: String, required: true,default: "Order Placed"},
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true, default: false },
    date:{type: String, required: true},
});

const orderModel = Mongoose.models.order || Mongoose.model("order", orderSchema);

export default orderModel;
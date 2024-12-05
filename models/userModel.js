import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        phone_number: { type: String, require: true, unique: true },
        cartData: { type: Object, default: {} },
    },
    { minimize: false }
);

const userModel = mongoose.model.user || mongoose.model("user, userSchema");

export default userModel;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImg: { type: String, default: "https://i.pravatar.cc/300" },
        address: { type: Object, default: {} },
        cartData: { type: Object, default: {} },
    },
    { minimize: false }
);



const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;

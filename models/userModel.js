import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
        // confirm password: { type: String, required: true },
        cartData: { type: Object, default: {} },
    },
    { minimize: false }
);

// ใช้ pre-save hook เพื่อตรวจสอบและคัดลอกรหัสผ่าน
// userSchema.pre('save', function(next) {
//     if (this.password !== this.confirm password) {
//         return next(new Error('Passwords do not match'));
//     }
//     next();
// });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;

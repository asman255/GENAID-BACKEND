import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};


// Route: for user login
const loginUser = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        const user = await userModel.findOne({ email: email.toLowerCase() }); 
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, message: "welcome! User!" ,token });
        } else {
            res.json({ success: false, message: "Incorrect password" });
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
    
};


//Route: for user register
const registerUser = async (req, res) => {
    try {
        const { fullname, email, password,phone } = req.body;
        const exists = await userModel.findOne({ email });
        const phoneExists = await userModel.findOne({ phone });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }
        if (phoneExists) {
            return res.json({ success: false, message: "phone already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if(!validator.isMobilePhone(phone)){
            return res.json({ success: false, message: "Please enter a valid phone number" });
        } 
        console.log(req.body);  
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({ fullname, email, phone, password: hashedPassword });
        const savedUser = await newUser.save();
        const token = createToken(savedUser._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//Route: for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD
        )
        {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Incorrect email or password" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};  

//Route: for getting all address of specific user
const getUserAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }
        res.json({ success: true, message: "User addresses", addresses: user.address });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const getUserinfo = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId, { password: 0, cartData: 0 });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }
        res.json({ success: true, message: "User info", user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const editUserinfo = async (req, res) => {
    try {
        const userId = req.userId;
        const { fullname, email, phone } = req.body;
        const user = await userModel.findByIdAndUpdate(userId, { fullname, email, phone }, { new: true });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }
        res.json({ success: true, message: "User info updated", user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};





export { loginUser, registerUser, adminLogin,getUserAddress,getUserinfo,editUserinfo };
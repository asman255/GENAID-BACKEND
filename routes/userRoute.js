import express from "express";
import{ registerUser, loginUser, adminLogin, getUserAddress,getUserinfo,editUserinfo } from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";


const userRouter = express.Router();
userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/admin",adminLogin);
userRouter.get("/address",userAuth,getUserAddress);

userRouter.get("/userinfo",userAuth,getUserinfo);
userRouter.post("/edituserinfo",userAuth,editUserinfo);

export default userRouter;
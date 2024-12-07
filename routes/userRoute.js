import express from "express";
import{ registerUser, loginUser, adminLogin } from "../controllers/userController.js";
import  userAuth  from "../middlewares/userauth.js";

const userRouter = express.Router();
userRouter.post("/register",userAuth,registerUser);
userRouter.post("/login",userAuth,loginUser);
userRouter.post("/admin",userAuth,adminLogin);


export default userRouter;
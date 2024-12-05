import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
// import productRouter from "./routes/productRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());

// const allowedOrigins = [
//   "https://frontend-admin-psi-green.vercel.app",
//   "https://frontend-user-theta.vercel.app",
//   "http://localhost:5173", // For local development
//   "http://localhost:5176", // For local development
//   "https://76.76.21.98:443"
// ];

 // Configure CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the origin
      } else {
        callback(new Error("Not allowed by CORS")); // Block the origin
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies or Authorization headers
  })
);

app.use("/api/user", userRouter);
// app.use("/api/product", productRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.status(200).send("API is Working");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

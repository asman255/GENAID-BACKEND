import express from "express";
import cors from "cors";
import "dotenv/config";
// Uncomment and test these as needed
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";

// import productRouter from "./routes/productRoute.js";
// import cartRouter from "./routes/cartRoute.js";

// import connectCloudinary from "./config/cloudinary.js";
// import productRouter from "./routes/productRoute.js";
// import cartRouter from "./routes/cartRoute.js";
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoute.js";
import cartRouter from "./routes/cartRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Establish database connection
connectDB();
connectCloudinary();

// Middleware to parse JSON
app.use(express.json());

// CORS middleware
// app.use(
//   cors({
//     origin: "*", // Adjust the origin as needed for security
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
app.use(cors());

// API routes
app.use("/api/products", productRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/category", categoryRouter);
app.use("/api/cart", cartRouter);
// Uncomment the below routes when ready

// app.use("/api/user", userRouter);

// Uncomment the below routes when ready
// app.use("/api/product", productRouter);

// app.use("/api/cart", cartRouter);

// Default route
app.get("/", (req, res) => {
  res.status(200).send("API is Working");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port} 🌐`);
});

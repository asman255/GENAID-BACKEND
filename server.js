import express from "express";
import cors from "cors";
import "dotenv/config";
// Uncomment and test these as needed
import connectDB from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
// import userRouter from "./routes/userRoute.js";
// import productRouter from "./routes/productRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";
import cardProductRouter from "./routes/CardProductRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// Connect to the database
connectDB();

// Cloudinary connection (if used)
// connectCloudinary();

// Middleware to parse JSON
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  "https://frontend-admin-psi-green.vercel.app",
  "https://frontend-user-theta.vercel.app",
  "http://localhost:5173", // For local development
  "http://localhost:5176", // For local development
  "https://76.76.21.98:443", // Add any other required domains here
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies or Authorization headers
  })
);

// API routes
app.use("/api/cardProducts", cardProductRouter);
// Uncomment the below routes when ready
// app.use("/api/user", userRouter);
// app.use("/api/product", productRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/order", orderRouter);

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
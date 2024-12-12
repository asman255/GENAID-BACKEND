import express from "express";
import {
  getProductList,
  getProductRead,
  searchProducts,
} from "../controllers/productController.js";

const productRouter = express.Router();

// Order matters: Specific routes like "/search" must come before dynamic ones like "/:id"
productRouter.get("/search", searchProducts); // Search route
productRouter.get("/", getProductList); // List products route
productRouter.get("/:id", getProductRead); // Get product by ID route

export default productRouter;
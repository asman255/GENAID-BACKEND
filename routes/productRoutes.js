import express from "express";
import {
  getProductList,
  getProductRead,
  searchProducts,
} from "../controllers/productController.js";

const productRouter = express.Router();

// Middleware สำหรับ Validate Query Parameters
const validateSearchQuery = (req, res, next) => {
  const { search, category, tag, minPrice, maxPrice, limit, skip } = req.query;

  // ตรวจสอบว่าค่า minPrice และ maxPrice เป็นตัวเลข
  if ((minPrice && isNaN(minPrice)) || (maxPrice && isNaN(maxPrice))) {
    return res
      .status(400)
      .json({ message: "minPrice and maxPrice must be valid numbers" });
  }

  // ตรวจสอบว่า limit และ skip เป็นตัวเลข
  if ((limit && isNaN(limit)) || (skip && isNaN(skip))) {
    return res
      .status(400)
      .json({ message: "limit and skip must be valid numbers" });
  }

  next(); // ดำเนินการต่อไปยัง Controller
};

// Route Definitions
productRouter.get("/search", validateSearchQuery, searchProducts); // Search route
productRouter.get("/", getProductList); // List products route
productRouter.get("/:id", getProductRead); // Get product by ID route

export default productRouter;

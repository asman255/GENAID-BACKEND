import express from "express";
import {getCategories,getProductsByCategory} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

// Get all categories
categoryRouter.get("/", getCategories);

categoryRouter.get("/filter-by-category", getProductsByCategory); // Filter by category route

export default categoryRouter;
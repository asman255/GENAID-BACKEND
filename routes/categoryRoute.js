import express from "express";
import {getCategories} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

// Get all categories
categoryRouter.get("/", getCategories);


export default categoryRouter;
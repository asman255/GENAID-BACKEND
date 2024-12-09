import mongoose from "mongoose";
import categoryModel from "../models/categoryModel.js";

const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching categories" });
    }
};

export { getCategories };
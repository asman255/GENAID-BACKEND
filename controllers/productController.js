import Products from "../models/productModels.js";
import mongoose from "mongoose";

// Get all card products or filter by category
export const getProductList = async (req, res) => {
  try {
    const { categoriesname } = req.query;

    // Create query object for case-insensitive match
    const query = categoriesname
      ? { categoriesname: { $regex: new RegExp(categoriesname, "i") } } // Case-insensitive regex match
      : {};

    const products = await Products.find(query);
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.status(200).json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error fetching card products" });
  }
};

// Get a specific card product by ID
export const getProductRead = async (req, res) => {
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "Invalid product ID" });

    const product = await CardProducts.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error fetching card product" });
  }
};

/*
// Add a new card product
export const addCardProduct = async (req, res) => {
  try {
    const { productname, categoriesname, price } = req.body;

    // Validate required fields
    if (!productname || !categoriesname || price === undefined) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Check for duplicate product
    const existingProduct = await CardProducts.findOne({ productname });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const newProduct = new CardProducts(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Card product added successfully", product: newProduct });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error adding card product" });
  }
};

// Update an existing card product
export const updateCardProduct = async (req, res) => {
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "Invalid product ID" });

    const { productname } = req.body;

    // Check if the updated product name is already taken
    const existingProduct = await CardProducts.findOne({
      productname,
      _id: { $ne: req.params.id }, // ไม่รวม ID ของสินค้าที่กำลังอัปเดต
    });

    if (existingProduct) {
      return res.status(400).json({ message: "Product name already exists" });
    }

    const updatedProduct = await CardProducts.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Card product updated successfully", product: updatedProduct });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error updating card product" });
  }
};
*/
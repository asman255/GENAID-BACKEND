import Products from "../models/productModels.js";
import mongoose from "mongoose";

// Get all products or filter by category
export const getProductList = async (req, res) => {
  try {
    const { categoriesname } = req.query;

    const query = categoriesname
      ? { categoriesname: { $regex: new RegExp(categoriesname, "i") } }
      : {};

    const products = await Products.find(query);

    if (products.length === 0) {
      console.log("No products found for category:", categoriesname); // Debugging
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err.message); // Debugging
    res.status(500).json({ message: "Error fetching products" });
  }
};

// Get a specific product by ID
export const getProductRead = async (req, res) => {
  try {
    const { id } = req.params;

    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return res.status(400).json({
        message: "Invalid product ID provided",
        invalidId: id,
      });
    }

    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error fetching product" });
  }
};

// Search API for products with advanced filters
export const searchProducts = async (req, res) => {
  try {
    const { search, category, tag, minPrice, maxPrice, limit, skip, sort } = req.query;

    // Build the query object dynamically
    const query = {};

    if (search) {
      const searchRegex = new RegExp(search.split(" ").join("|"), "i");
      query.$or = [
        { categoriesname: { $regex: searchRegex } },
        { productname: { $regex: searchRegex } },
        { tags: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
      ];
    }

    if (category) query.categoriesname = { $regex: new RegExp(category, "i") };
    if (tag) query.tags = { $regex: new RegExp(tag, "i") };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    console.log("Search Query:", query); // Debug Query Object

    const pageLimit = parseInt(limit) || 10;
    const pageSkip = parseInt(skip) || 0;
    const sortOption = sort || "productname";

    const searchResults = await Products.find(query)
      .limit(pageLimit)
      .skip(pageSkip)
      .sort(sortOption);

    console.log("Search Results:", searchResults); // Debug Search Results

    if (searchResults.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(searchResults);
  } catch (err) {
    console.error("Error fetching search results:", err.message);
    res.status(500).json({ message: "Error fetching search results", error: err.message });
  }
};

/*
// Get all products filtered by a specific category

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ message: "Category is required for filtering" });
    }

    const products = await Products.find({
      categoriesname: { $regex: new RegExp(category, "i") },
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products by category:", err.message);
    res.status(500).json({ message: "Error fetching products by category", error: err.message });
  }
};


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
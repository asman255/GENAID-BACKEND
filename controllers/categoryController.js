import mongoose from "mongoose";
import categoryModel from "../models/categoryModel.js";
import Products from "../models/productModels.js";


// Get all products filtered by a specific category
export const getProductsByCategory = async (req, res) => {
    try {
      const { category,minPrice,maxPrice } = req.query;
      console.log(category,minPrice,maxPrice);

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


// export const getProductsByCategory = async (req, res) => {
//   try {
//     const { category, minPrice, maxPrice } = req.query;
//     console.log(category, minPrice, maxPrice);

//     if (!category) {
//       return res.status(400).json({ message: "Category is required for filtering" });
//     }

//     const products = await Products.find({
//       categoriesname: { $regex: new RegExp(category, "i") },
//       price: { $gte: minPrice, $lte: maxPrice },
//     }).sort({ price: 1 }); // Sort by price in ascending order

//     // if (products.length === 0) {
//     //   return res.status(404).json({ message: "No products found for this category" });
//     // }

//     res.status(200).json(products);
//   } catch (err) {
//     console.error("Error fetching products by category:", err.message);
//     res.status(500).json({ message: "Error fetching products by category", error: err.message });
//   }
// };








  
export const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching categories" });
    }
};

  /*
  // Get all categories and their products
  export const getCategories = async (req, res) => {
    try {
      const categories = await Products.aggregate([
        // Group by categoriesname
        {
          $group: {
            _id: "$categoriesname",
            products: { $push: "$productname" },
            productDetails: {
              $push: {
                productname: "$productname",
                price: "$price",
                description: "$description",
                form: "$form",
                quantity: "$quantity",
                image: "$image",
                activeingredient: "$activeingredient",
                rating: "$rating",
                availability: "$availability",
              },
            },
          },
        },
        // Format the output
        {
          $project: {
            _id: 0,
            category: "$_id",
            products: 1,
            productDetails: 1,
          },
        },
      ]);
  
      if (!categories.length) {
        return res.status(404).json({ message: "No categories found" });
      }
  
      res.status(200).json(categories);
    } catch (err) {
      console.error("Error fetching categories:", err.message);
      res.status(500).json({ message: "Error fetching categories", error: err.message });
    }
  };
  */
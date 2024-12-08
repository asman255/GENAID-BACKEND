
import mongoose from "mongoose";

const ProductModels = mongoose.Schema({
  categoriesname: {
    type: String,
    required: true,
    trim: true,
  },
  productname: {
    type: String,
    required: true,
    trim: true,
    unique: true // Enforce uniqueness
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  tags: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  form: {
    type: String,
    required: true,
    enum: ["tablet", "capsule", "liquid", "powder", "cream", "syrup"],
  },
  quantity: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  activeingredient: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  availability: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model('product', ProductModels);

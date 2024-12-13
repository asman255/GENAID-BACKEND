import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
});

const categoryModel = mongoose.models.category || mongoose.model("categories", categorySchema);

export default categoryModel;
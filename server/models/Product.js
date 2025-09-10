import mongoose from 'mongoose';


const ProductSchema = new mongoose.Schema(
    {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    state: { type: String, required: true },
    lga: { type: String, required: true },
    images: [{ type: String }], // store URLs (Cloudinary)
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
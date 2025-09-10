import Product from "../../models/Product.js";


export const getFilteredProducts = async (req, res) => {
    try {

        const products = await Product.find({});

        res.status(200).json({
            success: true,
            data : products
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message: "Internal Server Error"});
    }
};



export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, state, lga } = req.body;

    if (!title || !description || !price || !category || !state || !lga) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    const images = req.files ? req.files.map(file => file.path) : [];

    const product = await Product.create({
      title,
      description,
      price,
      category,
      state,
      lga,
      images,
      user: req.user._id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


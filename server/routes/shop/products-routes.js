import express from "express";
import {getFilteredProducts, createProduct} from "../../controllers/shop/products-controller.js";
import authenticateUser from "../../middleware/authMiddleware.js";
import upload from "../../config/upload.js";


const router = express.Router();

router.get("/get", getFilteredProducts);
router.post("/shop/post-ad", authenticateUser, upload.array("images", 5), createProduct);

export default router;



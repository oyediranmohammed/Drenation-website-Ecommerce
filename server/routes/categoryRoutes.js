// backend/routes/categoryRoutes.js
import express from "express";

const router = express.Router();

// In a real app, you might fetch this from DB
const categories = [
  "Electronics",
  "Mobile Phones",
  "Computers & Laptops",
  "Vehicles",
  "Real Estate",
  "Jobs",
  "Services",
  "Fashion",
  "Sports & Outdoors",
  "Pets",
  "Home & Garden"
];

router.get("/", (req, res) => {
  res.json(categories);
});

export default router;

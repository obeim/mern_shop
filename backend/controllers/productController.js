import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

// @desc    Fetch All Products
// @Route   /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @desc    Fetch Single Product
// @Route   /api/products/:id
// @access  Public

export const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

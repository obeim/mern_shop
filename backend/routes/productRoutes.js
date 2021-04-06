import express from "express";
const router = express.Router();
import {
  getProducts,
  getSingleProduct,
} from "../controllers/productController.js";

router.get("/", getProducts);
router.get("/:id", getSingleProduct);
export default router;

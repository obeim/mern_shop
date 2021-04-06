import express from "express";
import { login, register, getProfile } from "../controllers/userController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", requireAuth, getProfile);

export default router;

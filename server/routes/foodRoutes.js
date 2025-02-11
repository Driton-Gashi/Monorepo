import express from "express";
import { createNewFood, getFoods } from "../controllers/foodController.js";
const router = express.Router();

// Register route
router.post("/food", createNewFood);
router.get("/food", getFoods);

export default router;

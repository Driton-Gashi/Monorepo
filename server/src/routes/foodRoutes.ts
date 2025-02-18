import express from "express";
import { createNewFood, getFoods, getCategories } from "../controllers/foodController";
const router = express.Router();

// Register route
router.post("/food", createNewFood);
router.get("/food", getFoods);
router.get("/categories", getCategories)
export default router;

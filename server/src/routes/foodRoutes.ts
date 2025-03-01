import express from "express";
import { createNewFood, getFoods, getCategories,getFoodsByCategoryId, deleteFoodByID } from "../controllers/foodController";
const router = express.Router();

// Register route
router.post("/food", createNewFood);
router.get("/food", getFoods);
router.get("/categories", getCategories)
router.get("/foodByCategory", getFoodsByCategoryId)
router.delete("/deleteFood/:id", deleteFoodByID)
export default router;

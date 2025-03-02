import express from "express";
import { createNewFood, getFoods, getCategories,getFoodsByCategoryId, deleteFoodByID, getFoodByID } from "../controllers/foodController";
const router = express.Router();

router.post("/food", createNewFood);
router.get("/food", getFoods);
router.get("/categories", getCategories)
router.get("/foodByCategory", getFoodsByCategoryId)
router.get("/foodByID/:id", getFoodByID)
router.delete("/deleteFood/:id", deleteFoodByID)
export default router;

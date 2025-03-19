import express from "express";
import {
  createNewFood,
  getFoods,
  getCategories,
  getFoodsByCategoryId,
  deleteFoodByID,
  getFoodByID,
  updateFoodByID,
  createNewCategory,
  deleteCategoryByID
} from "../controllers/foodController";

const router = express.Router();

// Foods
router.post("/foods", createNewFood);
router.get("/foods", getFoods);
router.get("/foods/:id", getFoodByID);
router.put("/foods/", updateFoodByID);
router.delete("/foods/:id", deleteFoodByID);

// Categories
router.post("/categories", createNewCategory);
router.get("/categories", getCategories);
router.get("/categories/:categoryId/foods", getFoodsByCategoryId);
router.delete("/categories/:id", deleteCategoryByID);

export default router;

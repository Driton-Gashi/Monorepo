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

router.post("/food", createNewFood);
router.get("/food", getFoods);
router.get("/categories", getCategories);
router.get("/foodByCategory", getFoodsByCategoryId);
router.get("/foodByID/:id", getFoodByID);
router.delete("/deleteFood/:id", deleteFoodByID);
router.put("/updateFood", updateFoodByID);
router.post("/category", createNewCategory);
router.delete("/deleteCategory/:id", deleteCategoryByID);

export default router;

import express from "express";
import {
  createNewFood,
  getFoods,
  getCategories,
  getFoodsByCategoryId,
  deleteFoodByID,
  getFoodByID,
  updateFoodByID,
} from "../controllers/foodController";
const router = express.Router();

router.post("/food", createNewFood);
router.get("/food", getFoods);
router.get("/categories", getCategories);
router.get("/foodByCategory", getFoodsByCategoryId);
router.get("/foodByID/:id", getFoodByID);
router.delete("/deleteFood/:id", deleteFoodByID);
router.put("/updateFood", updateFoodByID);
export default router;

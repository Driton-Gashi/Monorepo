"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const foodController_1 = require("../controllers/foodController");
const router = express_1.default.Router();
// Foods
router.post("/foods", foodController_1.createNewFood);
router.get("/foods", foodController_1.getFoods);
router.get("/foods/:id", foodController_1.getFoodByID);
router.put("/foods/", foodController_1.updateFoodByID);
router.delete("/foods/:id", foodController_1.deleteFoodByID);
// Categories
router.post("/categories", foodController_1.createNewCategory);
router.get("/categories", foodController_1.getCategories);
router.get("/categories/:categoryId/foods", foodController_1.getFoodsByCategoryId);
router.delete("/categories/:id", foodController_1.deleteCategoryByID);
exports.default = router;

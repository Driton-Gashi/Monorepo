"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFoodByID = exports.getFoodByID = exports.deleteCategoryByID = exports.deleteFoodByID = exports.getFoodsByCategoryId = exports.getFoods = exports.getCategories = exports.createNewCategory = exports.createNewFood = void 0;
const foodModel_1 = require("../models/foodModel");
const handleError = (res, error, message = "Server error") => {
    console.error(error);
    res.status(500).json({ message: `${message}: ${error.message || error}` });
};
const createNewFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, image_url, category_id } = req.body;
    try {
        const existingFood = yield (0, foodModel_1.getFoodByName)(name);
        if (existingFood) {
            res.status(400).json({ message: `${name} already exists in the database` });
            return;
        }
        yield (0, foodModel_1.createFood)(name, description, price, image_url, category_id);
        res.status(200).json({ message: `${name} - ${price}€ was added successfully` });
    }
    catch (error) {
        handleError(res, error, "Failed to create food");
    }
});
exports.createNewFood = createNewFood;
const createNewCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const existingCategory = yield (0, foodModel_1.getCategoryByName)(name);
        if (existingCategory) {
            res.status(400).json({ message: `${name} category already exists` });
            return;
        }
        yield (0, foodModel_1.createCategory)(name);
        res.status(200).json({ message: `${name} category was added successfully` });
    }
    catch (error) {
        handleError(res, error, "Failed to create category");
    }
});
exports.createNewCategory = createNewCategory;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, foodModel_1.getAllCategories)();
        if (!categories || categories.length === 0) {
            res.status(404).json({ message: "No categories found in the database" });
            return;
        }
        res.status(200).json(categories);
    }
    catch (error) {
        handleError(res, error, "Failed to fetch categories");
    }
});
exports.getCategories = getCategories;
const getFoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foods = yield (0, foodModel_1.getAllFoods)();
        if (!foods || foods.length === 0) {
            res.status(404).json({ message: "No food items found in the database" });
            return;
        }
        res.status(200).json(foods);
    }
    catch (error) {
        handleError(res, error, "Failed to fetch food items");
    }
});
exports.getFoods = getFoods;
const getFoodsByCategoryId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    try {
        if (!categoryId) {
            res.status(400).json({ message: "Category ID is required" });
            return;
        }
        const convertedCategoryId = parseInt(categoryId, 10);
        if (isNaN(convertedCategoryId)) {
            res.status(400).json({ message: "Invalid Category ID" });
            return;
        }
        const foods = yield (0, foodModel_1.getFoodsByCategory)(convertedCategoryId);
        if (!foods || foods.length === 0) {
            res.status(404).json({ message: "No food items found for this category" });
            return;
        }
        res.status(200).json(foods);
    }
    catch (error) {
        handleError(res, error, "Failed to fetch food items by category");
    }
});
exports.getFoodsByCategoryId = getFoodsByCategoryId;
const deleteFoodByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            res.status(400).json({ message: "Food ID is required" });
            return;
        }
        const foodId = parseInt(id, 10);
        if (isNaN(foodId)) {
            res.status(400).json({ message: "Invalid Food ID" });
            return;
        }
        const result = yield (0, foodModel_1.deleteFood)(foodId);
        if (result.success) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json(result);
        }
    }
    catch (error) {
        handleError(res, error, "Failed to delete food item");
    }
});
exports.deleteFoodByID = deleteFoodByID;
const deleteCategoryByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            res.status(400).json({ message: "Category ID is required" });
            return;
        }
        const categoryId = parseInt(id, 10);
        if (isNaN(categoryId)) {
            res.status(400).json({ message: "Invalid Category ID" });
            return;
        }
        const result = yield (0, foodModel_1.deleteCategory)(categoryId);
        if (result.success) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json(result);
        }
    }
    catch (error) {
        handleError(res, error, "Failed to delete category");
    }
});
exports.deleteCategoryByID = deleteCategoryByID;
const getFoodByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            res.status(400).json({ message: "Food ID is required" });
            return;
        }
        const foodId = parseInt(id, 10);
        if (isNaN(foodId)) {
            res.status(400).json({ message: "Invalid Food ID" });
            return;
        }
        const food = yield (0, foodModel_1.getFoodById)(foodId);
        if (!food) {
            res.status(404).json({ message: "Food not found" });
            return;
        }
        res.status(200).json(food);
    }
    catch (error) {
        handleError(res, error, "Failed to fetch food item");
    }
});
exports.getFoodByID = getFoodByID;
const updateFoodByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, description, price, category_id, image_url } = req.body;
    try {
        if (!id || !name || !description || !price || !category_id || !image_url) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const result = yield (0, foodModel_1.updateFood)(id, name, description, price, category_id, image_url);
        res.status(200).json(result);
    }
    catch (error) {
        handleError(res, error, "Failed to update food item");
    }
});
exports.updateFoodByID = updateFoodByID;

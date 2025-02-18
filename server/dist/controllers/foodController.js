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
exports.getFoods = exports.getCategories = exports.createNewFood = void 0;
const foodModel_1 = require("../models/foodModel");
const createNewFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, image_url, category_id } = req.body;
    try {
        // Check if food exists
        const existingFoodName = yield (0, foodModel_1.findFoodByName)(name);
        if (existingFoodName) {
            return res.status(400).json({ message: `${name} already exists in database` });
        }
        // Create user
        yield (0, foodModel_1.createFood)(name, description, price, image_url, category_id);
        res.status(200).json({ message: `${name} - ${price}€ was added successfully` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: `Server error: ${error}` });
    }
});
exports.createNewFood = createNewFood;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, foodModel_1.getAllCategories)();
        if (!categories) {
            return res.status(400).json({ message: "There's no categories in database" });
        }
        res.status(200).json(categories);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: `Server error: ${error}` });
    }
});
exports.getCategories = getCategories;
const getFoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if food exists
        const foods = yield (0, foodModel_1.getAllFoods)();
        if (!foods) {
            return res.status(400).json({ message: "There's no food in database" });
        }
        res.status(200).json(foods);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: `Server error: ${error}` });
    }
});
exports.getFoods = getFoods;

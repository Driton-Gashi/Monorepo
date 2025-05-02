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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.createCategory = exports.getCategoryByName = exports.getAllCategories = exports.deleteFood = exports.updateFood = exports.createFood = exports.getFoodByName = exports.getFoodsByCategory = exports.getFoodById = exports.getAllFoods = void 0;
const db_1 = __importDefault(require("../db"));
// Helper function for executing queries and handling errors
const executeQuery = (query_1, ...args_1) => __awaiter(void 0, [query_1, ...args_1], void 0, function* (query, params = []) {
    try {
        const [rows] = yield db_1.default.execute(query, params);
        return rows;
    }
    catch (error) {
        console.error("Database error:", error);
        throw error;
    }
});
// Food-related functions
const getAllFoods = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT foods.food_id, foods.image_url, foods.name, foods.description, foods.price, foods.category_id, categories.name AS category_name
    FROM foods
    JOIN categories ON foods.category_id = categories.id;
  `;
    return executeQuery(query);
});
exports.getAllFoods = getAllFoods;
const getFoodById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT * FROM foods WHERE food_id = ?";
    const rows = yield executeQuery(query, [id]);
    return rows[0] || null;
});
exports.getFoodById = getFoodById;
const getFoodsByCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT * FROM foods WHERE category_id = ?";
    return executeQuery(query, [categoryId]);
});
exports.getFoodsByCategory = getFoodsByCategory;
const getFoodByName = (foodName) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT * FROM foods WHERE name = ?";
    const rows = yield executeQuery(query, [foodName]);
    return rows[0] || null;
});
exports.getFoodByName = getFoodByName;
const createFood = (name, description, price, imageUrl, categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    INSERT INTO foods (name, description, price, image_url, category_id)
    VALUES (?, ?, ?, ?, ?)
  `;
    yield executeQuery(query, [name, description, price, imageUrl, categoryId]);
});
exports.createFood = createFood;
const updateFood = (id, name, description, price, categoryId, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    UPDATE foods
    SET name = ?, description = ?, price = ?, image_url = ?, category_id = ?
    WHERE food_id = ?
  `;
    const result = yield executeQuery(query, [name, description, price, imageUrl, categoryId, id]);
    if (result.affectedRows > 0) {
        return { success: true, message: "Food was updated successfully." };
    }
    else {
        return { success: false, message: "Food wasn't updated, please try again later!" };
    }
});
exports.updateFood = updateFood;
const deleteFood = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "DELETE FROM foods WHERE food_id = ?";
    const result = yield executeQuery(query, [id]);
    if (result.affectedRows > 0) {
        return { success: true, message: "Food item deleted successfully." };
    }
    else {
        return { success: false, message: "No food item found with the specified ID." };
    }
});
exports.deleteFood = deleteFood;
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT * FROM categories";
    return executeQuery(query);
});
exports.getAllCategories = getAllCategories;
const getCategoryByName = (categoryName) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT * FROM categories WHERE name = ?";
    const rows = yield executeQuery(query, [categoryName]);
    return rows[0] || null;
});
exports.getCategoryByName = getCategoryByName;
const createCategory = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "INSERT INTO categories (name) VALUES (?)";
    yield executeQuery(query, [name]);
});
exports.createCategory = createCategory;
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "DELETE FROM categories WHERE id = ?";
    const result = yield executeQuery(query, [id]);
    if (result.affectedRows > 0) {
        return { success: true, message: "Category was deleted successfully." };
    }
    else {
        return { success: false, message: "Category couldn't be deleted, please try again later!" };
    }
});
exports.deleteCategory = deleteCategory;

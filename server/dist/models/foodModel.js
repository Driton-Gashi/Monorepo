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
exports.createFood = exports.getAllCategories = exports.getAllFoods = exports.findFoodByName = void 0;
const db_1 = __importDefault(require("../db"));
const findFoodByName = (foodName) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.default.execute("SELECT * FROM foods WHERE name = ?", [foodName]);
    return rows[0];
});
exports.findFoodByName = findFoodByName;
const getAllFoods = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.default.execute(`
    SELECT foods.food_id, foods.image_url, foods.name, foods.description, foods.price, categories.name AS category_name
    FROM foods
    JOIN categories ON foods.category_id = categories.id;
`);
    return rows;
});
exports.getAllFoods = getAllFoods;
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.default.execute("SELECT * FROM categories");
    return rows;
});
exports.getAllCategories = getAllCategories;
const createFood = (name, description, price, image_url, category_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.execute("INSERT INTO foods (name, description, price, image_url, category_id) VALUES (?, ?, ?, ?, ?)", [name, description, price, image_url, category_id]);
});
exports.createFood = createFood;

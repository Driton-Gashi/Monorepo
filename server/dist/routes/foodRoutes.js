"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const foodController_1 = require("../controllers/foodController");
const router = express_1.default.Router();
// Register route
router.post("/food", foodController_1.createNewFood);
router.get("/food", foodController_1.getFoods);
router.get("/categories", foodController_1.getCategories);
exports.default = router;

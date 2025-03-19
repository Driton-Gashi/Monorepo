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
exports.createNewOrder = void 0;
const orderModel_1 = require("../models/orderModel");
const handleError = (res, error, message = "Server error") => {
    console.error(error);
    res.status(500).json({ message: `${message}: ${error.message || error}` });
};
const createNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, name, email, address, city, phone, extra, items } = req.body;
    try {
        yield (0, orderModel_1.createOrder)(user_id, name, email, address, city, phone, extra, items);
        res.status(200).json({ message: `Order was created successfully` });
    }
    catch (error) {
        handleError(res, error, "Failed to create food");
    }
});
exports.createNewOrder = createNewOrder;

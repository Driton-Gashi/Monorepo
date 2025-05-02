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
exports.verifyToken = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, email, password } = req.body;
    try {
        const existingUser = yield (0, userModel_1.findUserByEmail)(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const insertedId = yield (0, userModel_1.createUser)(name, lastname, email, hashedPassword);
        if (!process.env.JWT_SECRET)
            return res.status(400).json({ message: "JWT_SECRET is Missing" });
        const token = jsonwebtoken_1.default.sign({
            id: insertedId,
            name,
            lastname,
            email,
            address: null,
            city: null,
            phone: null,
            role: "client",
        }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            domain: "localhost",
            maxAge: 3600000,
        });
        res.status(201).json({
            message: "User registered successfully",
            token: token,
            user: { message: "empty for now" },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    try {
        const user = yield (0, userModel_1.findUserByEmail)(email);
        if (!user) {
            return res.status(400).json({ message: "User does not exist." });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, (_a = user.password) !== null && _a !== void 0 ? _a : "");
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Incorrect password." });
        }
        if (!process.env.JWT_SECRET)
            return res.status(400).json({ message: "JWT_SECRET is missing" });
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            address: user.address,
            city: user.city,
            phone: user.phone,
            role: user.role,
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            domain: "localhost",
            maxAge: 3600000,
        });
        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
});
exports.loginUser = loginUser;
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.JWT_SECRET)
        return res.status(400).json({ message: "JWT_SECRET missing" });
    const token = req.params.token;
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ user: user });
    }
    catch (error) {
        console.error("Admin verification error:", error);
        res.status(500).json({ message: "Nah nah nah 🤪 You can't fool me!" });
    }
});
exports.verifyToken = verifyToken;

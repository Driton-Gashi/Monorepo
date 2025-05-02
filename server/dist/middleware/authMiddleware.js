"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    var _a, _b, _c;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        if ((_b = req.headers.accept) === null || _b === void 0 ? void 0 : _b.includes("application/json")) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        res.redirect("/login");
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        if ((_c = req.headers.accept) === null || _c === void 0 ? void 0 : _c.includes("application/json")) {
            res.status(401).json({ error: "Invalid token" });
            return;
        }
        res.redirect("/login");
    }
};
exports.authMiddleware = authMiddleware;

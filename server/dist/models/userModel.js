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
exports.createUser = exports.findUserByEmail = void 0;
const db_1 = __importDefault(require("../db"));
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
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT * FROM users WHERE email = ?";
    const rows = yield executeQuery(query, [email]);
    return rows[0] || null;
});
exports.findUserByEmail = findUserByEmail;
const createUser = (name, lastname, email, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    INSERT INTO users (name, lastname, email, password)
    VALUES (?, ?, ?, ?)
  `;
    const insertedId = yield executeQuery(query, [name, lastname, email, hashedPassword]);
    return insertedId.insertId;
});
exports.createUser = createUser;

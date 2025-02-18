"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Hostinger Database
const pool = mysql2_1.default.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});
// Local Database
// const pool = mysql.createPool({
//   host: "localhost",
//   user: 'root',
//   password: '',
//   database: 'foodApp',
// });
const db = pool.promise();
exports.default = db;

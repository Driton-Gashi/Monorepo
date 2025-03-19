import express from "express";
import { createNewOrder } from "../controllers/orderController";

const router = express.Router();

router.post("/order", createNewOrder)

export default router;
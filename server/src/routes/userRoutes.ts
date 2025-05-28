import express from "express";
import { registerUser, loginUser, verifyToken, updateUserProfile } from "../controllers/userController";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/verify-token/:token", verifyToken);

router.put("/update-profile", updateUserProfile);

export default router;

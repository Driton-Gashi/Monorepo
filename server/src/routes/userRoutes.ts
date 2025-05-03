import express from "express";
import { registerUser, loginUser, verifyToken} from "../controllers/userController";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/verify-token/:token", verifyToken);

export default router;

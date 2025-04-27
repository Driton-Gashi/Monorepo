import express from "express";
import { registerUser, loginUser, verifyToken} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/verify-token/:token", verifyToken);

export default router;

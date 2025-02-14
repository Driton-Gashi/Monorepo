import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import foodRoutes from "./routes/foodRoutes.js"
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON bodies


// Use authentication routes
app.use("/api/", authRoutes);
app.use("/api/", foodRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

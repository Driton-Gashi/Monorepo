import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import foodRoutes from "./routes/foodRoutes"
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/", authRoutes);
app.use("/api/", foodRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

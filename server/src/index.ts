import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import foodRoutes from "./routes/foodRoutes"
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/", userRoutes);
app.use("/api/", foodRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

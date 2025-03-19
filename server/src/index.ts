import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import foodRoutes from "./routes/foodRoutes";
import orderRoutes from "./routes/orderRoutes"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/", userRoutes);
app.use("/api/", foodRoutes);
app.use("/api/", orderRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

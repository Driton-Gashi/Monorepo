import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import foodRoutes from "./routes/foodRoutes";
import orderRoutes from "./routes/orderRoutes"
import { CorsOptions } from "cors";

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://app.dritongashi.com'
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/", userRoutes);
app.use("/api/", foodRoutes);
app.use("/api/", orderRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

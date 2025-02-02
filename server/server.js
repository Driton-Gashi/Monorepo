const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./authRoutes");

dotenv.config();

app.use(cors());
app.use(express.json()); // to parse JSON bodies

// Add "/api" prefix to all auth routes
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

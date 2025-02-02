const express = require("express");

// Create an Express app
const app = express();

// Define a port
const PORT = 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
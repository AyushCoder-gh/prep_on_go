const express = require("express");
const cors = require("cors");

const helloRoutes = require("./routes/helloRoutes");

const app = express();

// Middleware
app.use(cors());

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to PrepOnGo Backend 🚀");
});

// API Routes
app.use("/api", helloRoutes);

module.exports = app;
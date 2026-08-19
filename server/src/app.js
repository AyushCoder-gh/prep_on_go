const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to PrepOnGo Backend 🚀");
});

// API Routes
app.use("/api", userRoutes);

app.use(errorHandler);

module.exports = app;
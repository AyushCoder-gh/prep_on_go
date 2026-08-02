const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Welcome to PrepOnGo Backend 🚀");
});

app.get("/api/hello", (req, res) => {
    res.json({
        message: "Hello from PrepOnGo Backend!",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
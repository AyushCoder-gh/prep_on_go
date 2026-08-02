const express = require("express");
const router = express.Router();

const { getHelloMessage } = require("../controllers/helloController");

router.get("/hello", getHelloMessage);

module.exports = router;
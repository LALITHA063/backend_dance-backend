const express = require("express");
const router = express.Router();

// Import correctly (case sensitive)
const { signup, login } = require("../Controllers/AuthController");

router.post("/signup", signup); // ✅ must be a function
router.post("/login", login);   // ✅ must be a function

module.exports = router;

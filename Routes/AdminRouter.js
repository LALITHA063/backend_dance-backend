const express = require("express");
const { adminLogin } = require("../Controllers/AdminController");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "Admin API is working" });
});

router.post("/login", adminLogin);

module.exports = router;
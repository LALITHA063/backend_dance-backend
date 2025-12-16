const express = require("express");
const router = express.Router();

const { submitContact } = require("../Controllers/ContactController");

router.post("/", submitContact);

module.exports = router;
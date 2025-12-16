const express = require("express");
const router = express.Router();

const { submitEnrollment } = require("../Controllers/EnrollmentController");

router.post("/", submitEnrollment);

module.exports = router;
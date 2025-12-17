const express = require("express");
const Instructor = require("../Models/InstructorModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const instructor = new Instructor(req.body);
    await instructor.save();
    res.status(201).json(instructor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const Enrollment = require("../Models/EnrollmentModel");

const { submitEnrollment } = require("../Controllers/EnrollmentController");

// Submit enrollment (public)
router.post("/", submitEnrollment);

// Get enrollments for admin
router.get("/", async (req, res) => {
  try {
    const { adminId, status } = req.query;
    let filter = {};
    
    if (adminId) filter.adminId = adminId;
    if (status) filter.status = status;
    
    const enrollments = await Enrollment.find(filter).sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update enrollment status
router.put("/:id", async (req, res) => {
  try {
    const { status, adminId } = req.body;
    
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status, adminId },
      { new: true }
    );
    
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }
    
    res.json({ message: "Enrollment updated", enrollment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
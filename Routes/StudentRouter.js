const express = require("express");
const Student = require("../Models/StudentModel");
const router = express.Router();

// Get all students
router.get("/", async (req, res) => {
  try {
    const { adminId } = req.query;
    let filter = {};
    
    // If adminId is provided, filter by it, otherwise return all students
    if (adminId) {
      filter.adminId = adminId;
    }
    
    const students = await Student.find(filter).populate('adminId', 'username');
    console.log('Found students:', students.length);
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: error.message });
  }
});

// Add new student
router.post("/", async (req, res) => {
  try {
    console.log("Received student data:", req.body);
    const { name, phone, batch, category, adminId } = req.body;
    
    if (!name || !phone || !batch || !category) {
      console.log("Missing fields:", { name: !!name, phone: !!phone, batch: !!batch, category: !!category });
      return res.status(400).json({ message: "Name, phone, batch, and category are required" });
    }
    
    const student = new Student({ name, phone, batch, category, adminId });
    const savedStudent = await student.save();
    console.log("Student saved successfully:", savedStudent);
    res.status(201).json({ message: 'Student added successfully', student: savedStudent });
  } catch (error) {
    console.error("Error saving student:", error);
    res.status(400).json({ message: error.message });
  }
});

// Update student
router.put("/:id", async (req, res) => {
  try {
    const { name, phone, batch, category, adminId } = req.body;
    
    if (!name || !phone || !batch || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id, adminId },
      { name, phone, batch, category },
      { new: true }
    );
    
    if (!student) {
      return res.status(404).json({ message: "Student not found or unauthorized" });
    }
    
    res.json({ message: 'Student updated successfully', student });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(400).json({ message: error.message });
  }
});

// Delete student
router.delete("/:id", async (req, res) => {
  try {
    const { adminId } = req.query;
    const student = await Student.findOneAndDelete({ _id: req.params.id, adminId });
    
    if (!student) {
      return res.status(404).json({ message: "Student not found or unauthorized" });
    }
    
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
const express = require("express");
const mongoose = require("mongoose");
const Attendance = require("../Models/AttendanceModel");
const Student = require("../Models/StudentModel");
const router = express.Router();

// Get attendance for admin's students
router.get("/", async (req, res) => {
  try {
    const { adminId, date, batch } = req.query;
    let filter = { adminId };
    
    if (date) filter.date = new Date(date);
    if (batch) filter.batch = batch;
    
    const attendance = await Attendance.find(filter)
      .populate('studentId', 'name phone batch category')
      .sort({ date: -1 });
    
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark attendance
router.post("/", async (req, res) => {
  try {
    const { studentId, adminId, date, status, batch } = req.body;
    
    if (!studentId || !adminId || !date || !status || !batch) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    // Check if attendance already exists for this student on this date
    const existingAttendance = await Attendance.findOne({
      studentId,
      date: new Date(date)
    });
    
    if (existingAttendance) {
      // Update existing attendance
      existingAttendance.status = status;
      await existingAttendance.save();
      res.json({ message: "Attendance updated", attendance: existingAttendance });
    } else {
      // Create new attendance record
      const attendance = new Attendance({ studentId, adminId, date: new Date(date), status, batch });
      await attendance.save();
      res.status(201).json({ message: "Attendance marked", attendance });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get attendance summary
router.get("/summary", async (req, res) => {
  try {
    const { adminId, startDate, endDate, batch } = req.query;
    
    if (!adminId) {
      return res.status(400).json({ message: "adminId is required" });
    }
    
    let matchFilter = { adminId: new mongoose.Types.ObjectId(adminId) };
    if (batch) matchFilter.batch = batch;
    if (startDate && endDate) {
      matchFilter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    const summary = await Attendance.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: "$studentId",
          totalPresent: { $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] } },
          totalAbsent: { $sum: { $cond: [{ $eq: ["$status", "Absent"] }, 1, 0] } },
          totalLate: { $sum: { $cond: [{ $eq: ["$status", "Late"] }, 1, 0] } },
          totalClasses: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "students",
          localField: "_id",
          foreignField: "_id",
          as: "student"
        }
      },
      { $unwind: { path: "$student", preserveNullAndEmptyArrays: false } }
    ]);
    
    res.json(summary);
  } catch (error) {
    console.error("Attendance summary error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  day: { type: String, required: true },
  timeSlot: { type: String, required: true },
  className: { type: String, required: true },
  instructor: { type: String, required: true },
  room: { type: String, required: true },
  batch: { type: String, required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: false },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Timetable", timetableSchema);
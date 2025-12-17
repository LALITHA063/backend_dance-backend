const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  participants: { type: Number, default: 0 },
  status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'], default: 'Upcoming' },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: false },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Event", eventSchema);
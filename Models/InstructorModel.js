const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  specialization: { type: String, required: true },
  experience: { type: String, required: false },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: false },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Instructor", instructorSchema);
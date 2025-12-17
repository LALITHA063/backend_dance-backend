const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  className: { type: String, required: true },
  instructor: { type: String, required: true },
  schedule: { type: String, required: true },
  duration: { type: String, required: true },
  capacity: { type: Number, required: true },
  enrolled: { type: Number, default: 0 },
  fee: { type: Number, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: false },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Class", classSchema);
const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: false },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  paidDate: { type: Date },
  status: { type: String, enum: ['Paid', 'Pending', 'Overdue'], default: 'Pending' },
  paymentMethod: { type: String, enum: ['Cash', 'Card', 'Online', 'UPI'], required: false },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: false },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Fee", feeSchema);
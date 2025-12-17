const Enrollment = require("../Models/EnrollmentModel");
const bcrypt = require("bcryptjs");

exports.submitEnrollment = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password } = req.body;
    
    const hashed = await bcrypt.hash(password, 10);
    
    await Enrollment.create({ firstname, lastname, email, phone, password: hashed });
    
    res.json({ message: "Enrollment submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
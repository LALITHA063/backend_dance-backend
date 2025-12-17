const Admin = require("../Models/AdminModel");
const bcrypt = require("bcryptjs");

const adminLogin = async (req, res) => {
  try {
    res.header('Content-Type', 'application/json');
    
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    const admin = await Admin.findOne({ username: trimmedUsername });
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(trimmedPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      admin: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { adminLogin };
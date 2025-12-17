require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./Models/AdminModel");

const checkAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    
    const admin = await Admin.findOne({ username: "admin" });
    if (admin) {
      console.log("Admin found:", admin.username);
      console.log("Password hash:", admin.password);
      
      // Test password comparison
      const isMatch = await bcrypt.compare("admin123", admin.password);
      console.log("Password match test:", isMatch);
    } else {
      console.log("No admin found");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.connection.close();
  }
};

checkAdmin();
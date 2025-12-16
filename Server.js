require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());

// ✅ Fix: include your actual frontend port (5174)
app.use(cors({
 origin: ["http://localhost:3000", "http://localhost:5173"],

  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

const authRoutes = require("./Routes/AuthRouter");
const contactRoutes = require("./Routes/ContactRouter");
const enrollmentRoutes = require("./Routes/EnrollmentRouter");

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/enrollment", enrollmentRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));
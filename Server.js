require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

const authRoutes = require("./Routes/AuthRouter");
const contactRoutes = require("./Routes/ContactRouter");
const enrollmentRoutes = require("./Routes/EnrollmentRouter");
const studentRoutes = require("./Routes/StudentRouter");
const attendanceRoutes = require("./Routes/AttendanceRouter");
const adminRoutes = require("./Routes/AdminRouter");
const instructorRoutes = require("./Routes/InstructorRouter");
const classRoutes = require("./Routes/ClassRouter");
const feeRoutes = require("./Routes/FeeRouter");
const eventRoutes = require("./Routes/EventRouter");
const timetableRoutes = require("./Routes/TimetableRouter");

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/enrollment", enrollmentRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/instructors", instructorRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/timetable", timetableRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Test routes to create sample data
app.post("/test/all-data", async (req, res) => {
  try {
    const Student = require("./Models/StudentModel");
    const Instructor = require("./Models/InstructorModel");
    const Class = require("./Models/ClassModel");
    const Attendance = require("./Models/AttendanceModel");
    const Fee = require("./Models/FeeModel");
    const Event = require("./Models/EventModel");
    const Timetable = require("./Models/TimetableModel");
    
    // Create sample students
    const students = await Student.insertMany([
      { name: "John Doe", phone: "1234567890", batch: "Morning", category: "Beginner" },
      { name: "Jane Smith", phone: "0987654321", batch: "Evening", category: "Advanced" },
      { name: "Mike Johnson", phone: "5555555555", batch: "Weekend", category: "Intermediate" }
    ]);
    
    // Create sample instructors
    const instructors = await Instructor.insertMany([
      { name: "Sarah Wilson", email: "sarah@dance.com", phone: "1111111111", specialization: "Ballet", experience: "5 years", status: "Active" },
      { name: "David Brown", email: "david@dance.com", phone: "2222222222", specialization: "Hip Hop", experience: "8 years", status: "Active" },
      { name: "Lisa Garcia", email: "lisa@dance.com", phone: "3333333333", specialization: "Contemporary", experience: "6 years", status: "Active" }
    ]);
    
    // Create sample classes
    const classes = await Class.insertMany([
      { className: "Ballet Basics", instructor: "Sarah Wilson", schedule: "Mon-Wed-Fri 9AM", duration: "1 hour", capacity: 15, enrolled: 12, fee: 100, status: "Active" },
      { className: "Hip Hop Advanced", instructor: "David Brown", schedule: "Tue-Thu 6PM", duration: "1.5 hours", capacity: 20, enrolled: 18, fee: 150, status: "Active" },
      { className: "Contemporary Flow", instructor: "Lisa Garcia", schedule: "Sat-Sun 10AM", duration: "2 hours", capacity: 12, enrolled: 10, fee: 200, status: "Active" }
    ]);
    
    // Create sample attendance
    const attendance = await Attendance.insertMany([
      { studentId: students[0]._id, date: new Date(), status: "Present", batch: "Morning" },
      { studentId: students[1]._id, date: new Date(), status: "Present", batch: "Evening" },
      { studentId: students[2]._id, date: new Date(), status: "Absent", batch: "Weekend" }
    ]);
    
    // Create sample fees
    const fees = await Fee.insertMany([
      { studentName: "John Doe", studentId: students[0]._id, amount: 100, dueDate: new Date(Date.now() + 30*24*60*60*1000), status: "Pending" },
      { studentName: "Jane Smith", studentId: students[1]._id, amount: 150, dueDate: new Date(Date.now() + 15*24*60*60*1000), status: "Paid", paidDate: new Date(), paymentMethod: "Card" },
      { studentName: "Mike Johnson", studentId: students[2]._id, amount: 200, dueDate: new Date(Date.now() - 5*24*60*60*1000), status: "Overdue" }
    ]);
    
    // Create sample events
    const events = await Event.insertMany([
      { title: "Annual Dance Competition", description: "Showcase your skills", date: new Date(Date.now() + 60*24*60*60*1000), time: "6:00 PM", venue: "Main Hall", participants: 25, status: "Upcoming" },
      { title: "Workshop: Modern Dance", description: "Learn new techniques", date: new Date(Date.now() + 30*24*60*60*1000), time: "2:00 PM", venue: "Studio A", participants: 15, status: "Upcoming" },
      { title: "Student Recital", description: "End of semester performance", date: new Date(Date.now() + 90*24*60*60*1000), time: "7:00 PM", venue: "Theater", participants: 40, status: "Upcoming" }
    ]);
    
    // Create sample timetable
    const timetable = await Timetable.insertMany([
      { day: "Monday", timeSlot: "9:00 AM - 10:00 AM", className: "Ballet Basics", instructor: "Sarah Wilson", room: "Studio A", batch: "Morning" },
      { day: "Tuesday", timeSlot: "6:00 PM - 7:30 PM", className: "Hip Hop Advanced", instructor: "David Brown", room: "Studio B", batch: "Evening" },
      { day: "Saturday", timeSlot: "10:00 AM - 12:00 PM", className: "Contemporary Flow", instructor: "Lisa Garcia", room: "Studio C", batch: "Weekend" },
      { day: "Wednesday", timeSlot: "9:00 AM - 10:00 AM", className: "Ballet Basics", instructor: "Sarah Wilson", room: "Studio A", batch: "Morning" },
      { day: "Thursday", timeSlot: "6:00 PM - 7:30 PM", className: "Hip Hop Advanced", instructor: "David Brown", room: "Studio B", batch: "Evening" }
    ]);
    
    res.json({ 
      message: "All sample data created successfully!", 
      counts: {
        students: students.length,
        instructors: instructors.length,
        classes: classes.length,
        attendance: attendance.length,
        fees: fees.length,
        events: events.length,
        timetable: timetable.length
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add your specific instructors
app.post("/test/instructors", async (req, res) => {
  try {
    const Instructor = require("./Models/InstructorModel");
    
    const instructors = await Instructor.insertMany([
      { name: "Lalitha Vanangamudi", specialization: "Lead Instructor", status: "Active" },
      { name: "Poojitha Sreeju", specialization: "Hip-Hop", status: "Active" },
      { name: "Namisha Begum", specialization: "Ballet Instructor", status: "Active" },
      { name: "Selen Danila", specialization: "Contemporary coach", status: "Active" },
      { name: "Sanjan Juliet", specialization: "Jazz Instructor", status: "Active" },
      { name: "Kavipriya Artsi", specialization: "Bharathanatyam Instructor", status: "Active" },
      { name: "Latika Abhi", specialization: "Break Dance Instructor", status: "Active" },
      { name: "Lakshana Arav", specialization: "Kuchipudi", status: "Active" }
    ]);
    
    res.json({ 
      message: "All instructors added successfully!", 
      instructors: instructors,
      count: instructors.length
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
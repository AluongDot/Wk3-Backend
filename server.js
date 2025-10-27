const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const taskRoutes = require("./Routes/tasksRoutes");
const connectDB = require("./config/db");
const { default: axios } = require("axios");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS configuration
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://task-manager-w60i.onrender.com"] // your deployed frontend
    : ["http://localhost:5173"]; // local dev frontend

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., Postman, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware
app.use(express.json());

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Task Manager API is running...");
});

app.use("/api/tasks", taskRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
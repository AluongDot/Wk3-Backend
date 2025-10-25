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

app.use(cors({
  origin: "https://task-manager-w60i.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("Task Manager API is running...");
});

// Use routes
app.use("/api/tasks", taskRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));

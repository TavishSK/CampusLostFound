const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const itemRoutes = require("./routes/itemRoutes");

// Use routes
app.use("/api/items", itemRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("CampusLostFound API running 🚀");
});

const PORT = 5001;

// Connect DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Error ❌:", err);
  });
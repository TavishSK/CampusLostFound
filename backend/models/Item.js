const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["lost", "found"],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  location: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  contact: {
    type: String
  }
});

module.exports = mongoose.model("Item", itemSchema);
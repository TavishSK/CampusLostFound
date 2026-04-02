const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const findMatches = require("../utils/matcher");

// POST - Add item + find matches
router.post("/", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();

    // Find opposite type items
    const oppositeType = newItem.type === "lost" ? "found" : "lost";

    const items = await Item.find({ type: oppositeType });

    const matches = findMatches(newItem, items);

    res.status(201).json({
      savedItem,
      matches
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
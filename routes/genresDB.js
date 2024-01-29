const express = require("express");
const router = express.Router();
const config = require("config");
const { Genre, schema } = require("../models/genre.js");

// Get all genres
router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find();
    res.send(genres);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;

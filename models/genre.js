const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose Schema
const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
});

// Mongoose Model
const Genre = mongoose.model("Genre", genreSchema);

// Joi Schema
const schema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
});

exports.Genre = Genre;
exports.schema = schema;

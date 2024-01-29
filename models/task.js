const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose Schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  task: { type: String, maxLength: 25, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, minLength: 3, required: true },
  severity: { type: String, required: true },
  completed: { type: Boolean, default: false, required: true },
});

// Mongoose Model
const Task = mongoose.model("Task", taskSchema);

// Joi Schema
const schema = Joi.object({
  title: Joi.string().required(),
  task: Joi.string().max(25).required(),
  owner: Joi.string().required(),
  category: Joi.string().min(3).required(),
  severity: Joi.string().required(),
  completed: Joi.boolean().default(false).required(),
});

exports.Task = Task;
exports.schema = schema;

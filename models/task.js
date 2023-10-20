const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema
const taskSchema = new mongoose.Schema({
    Title: {type: String, required: true},
    Task: {type: String, maxLength: 25, required: true},
    Owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    AdditionalInfo: {type: String, maxLength: 250},
    Category: {type: String, minLength: 3, required: true},
    Tags: {type: [String], required: true, validate: {
        validator: function (array) {return array.length > 0;},
        message: 'Tags must have at least one value.'
      }},
    Severity: {type: String, enum: ['Normal', 'Important', 'Critical'], required: true},
    Completed: {type: Boolean, default: false, required: true}
});

// Mongoose Model
const Task = mongoose.model('Task', taskSchema);

// Joi Schema
const schema = Joi.object({
  Title: Joi.string().required(),
  Task: Joi.string().max(25).required(),
  Owner: Joi.string().required(),
  AdditionalInfo: Joi.string().max(250),
  Category: Joi.string().min(3).required(),
  Tags: Joi.array().required().items(Joi.string().min(1)),
  Severity: Joi.string().valid('Normal', 'Important', 'Critical').required(),
  Completed: Joi.boolean().default(false).required()
});

exports.Task = Task;
exports.schema = schema;
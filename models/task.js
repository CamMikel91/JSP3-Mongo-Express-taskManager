const mongoose = require('mongoose');

// Mongoose Schema
const taskSchema = new mongoose.Schema({
    Title: {type: String, required: true},
    Task: {type: String, maxLength: 25, required: true},
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

module.exports = Task;
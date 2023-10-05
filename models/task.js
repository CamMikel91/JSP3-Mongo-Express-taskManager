const mongoose = require('mongoose');

// task Schema
const taskSchema = new mongoose.Schema({
    Title: String,
    Task: String,
    AdditionalInfo: String,
    Category: String,
    Tags: [String],
    Severity: Number,
    Completed: Boolean
});

// task Model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
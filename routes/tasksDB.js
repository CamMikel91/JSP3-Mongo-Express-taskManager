const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../models/task');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/taskDB')
    .then(() => console.log('Connected to MongoDB...\n'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Create a task
router.post('/', async (req, res) => {
    let task = new Task({
        Title: req.body.Title,
        Task: req.body.Task,
        AdditionalInfo: req.body.AdditionalInfo,
        Category: req.body.Category,
        Tags: req.body.Tags,
        Severity: req.body.Severity,
        Completed: req.body.Completed
    });
    task = await task.save();
    res.send(task);
});

// Read all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

// Read a single task
router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return res.status(404).send('The task with the given ID was not found.');
    }
    res.send(task);
});

// Update a task
router.put('/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, {
        Title: req.body.Title,
        Task: req.body.Task,
        AdditionalInfo: req.body.AdditionalInfo,
        Category: req.body.Category,
        Tags: req.body.Tags,
        Severity: req.body.Severity,
        Completed: req.body.Completed
    }, {
        new: true
    });
    if (!task) {
        return res.status(404).send('The task with the given ID was not found.');
    }
    res.send(task);
});

// Delete a task
router.delete('/:id', async (req, res) => {
    const task = await Task.findByIdAndRemove(req.params.id);
    if (!task) {
        return res.status(404).send('The task with the given ID was not found.');
    }
    res.send(task);
});

module.exports = router;
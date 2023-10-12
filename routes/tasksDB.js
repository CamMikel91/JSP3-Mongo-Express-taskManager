const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../models/task');
const schema = require('../schemas/joiTask');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/taskDB')
    .then(() => console.log('Connected to MongoDB...\n'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Create a task

router.post('/', async (req, res) => {
    let task = {
        Title: req.body.Title,
        Task: req.body.Task,
        AdditionalInfo: req.body.AdditionalInfo,
        Category: req.body.Category,
        Tags: req.body.Tags,
        Severity: req.body.Severity,
        Completed: req.body.Completed
    };

    const {error, value} = schema.validate(task);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        task = new Task(value);
        try {
            task = await task.save();
            res.send('Task added successfully... \n' + task);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
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
    let requestedTask = {
        Title: req.body.Title,
        Task: req.body.Task,
        AdditionalInfo: req.body.AdditionalInfo,
        Category: req.body.Category,
        Tags: req.body.Tags,
        Severity: req.body.Severity,
        Completed: req.body.Completed
    };
    const {error, value} = schema.validate(requestedTask);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {

        try {
            let updatedTask = await Task.findOneAndUpdate({_id: req.params.id}, value, {new: true});
            res.send('Task updated successfully... \n' + updatedTask);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
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
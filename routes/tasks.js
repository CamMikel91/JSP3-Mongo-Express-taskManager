const express = require("express");
const fs = require('fs');
const idPicker = require('../middleware/idPicker.js');
const saveTasks = require('../middleware/saveTasks.js');
const router = express.Router();

// Set the delay time for each request
let delay = 500;

// Task class
class Task {
    constructor(task) {
        this.id = idPicker(tasks, task); // id is assigned automatically based on the lowest available id
        this.task = task;
    }
};

// Load the saved tasks
let tasks = [];
let savedData = fs.readFileSync('taskLog.json');
tasks = JSON.parse(savedData);
    
// List all tasks
router.get('/', (req, res) => {
    setTimeout(() => {
        res.send(tasks);
    }, delay);
});

// List a single task
router.get('/:id', (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    setTimeout(() => {
        if (!task) {
            res.status(404).send('The task with the given ID was not found.');
        } else {
            res.send(task);
        }
    }, delay);
});

// Add a new task
router.post('/', (req, res) => {
    setTimeout(() => {
        if (!req.body.task || req.body.task.length <= 3) {
            res.status(400).send('Task is required and should be at least 3 characters long.');
            return;
        }
        const newTask = new Task(req.body.task);
        tasks.push(newTask);
        res.send(newTask);
        saveTasks('taskLog.json', tasks);
    }, delay);
});

// Update a task
router.put('/:id', (req, res) => {
    setTimeout(() => {
        if (!req.body.task || req.body.task.length < 3) {
            res.status(400).send('Task is required and should be at least 3 characters long.');
            return;
        }
        const task = tasks.find(task => task.id === parseInt(req.params.id));
        if (!task) {
            res.status(404).send('The task with the given ID was not found.');
        } else {
            task.task = req.body.task;
            res.send(task);
        }
        saveTasks('taskLog.json', tasks);
    }, delay);
});

// Remove a task
router.delete('/:id', (req, res) => {
    setTimeout(() => {
        const task = tasks.find(task => task.id === parseInt(req.params.id));
        if (!task) {
            res.status(404).send('The task with the given ID was not found.');
        } else {
            const index = tasks.indexOf(task);
            tasks.splice(index, 1);
            res.send(task);
        }
        saveTasks('taskLog.json', tasks);
    }, delay);
});

module.exports = router;
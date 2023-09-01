const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.listen(PORT, () => {
    fs.appendFile('logger.txt', `Server listening on port: ${PORT}\n`, (err) => {
        if (err) {
            throw err;
        }
    });
});

// Import the TestApplication class
const TestApplication = require('./logger.js');

// Create a new TestApplication object
let testApplication = new TestApplication;

// When the application is loaded, append a message to the logger.txt file
testApplication.on('loadApplication', () => {
    fs.appendFile('logger.txt', 'Application loaded!\n', (err) => {
        if (err) {
            throw err;
        } else {
            console.log('Finished!');
        }
    });
});

// Load the application
testApplication.loadApplication('Application is loading...');

// --------------------------------------------------------------------------------------------------

// Task Manager Application
let tasks = [];
// Load the saved tasks
let savedData = fs.readFileSync('taskLog.json');
tasks = JSON.parse(savedData);

// Save the current tasks
function saveTasks(file, array) {
    fs.writeFile(file, JSON.stringify(array), (err) => {
        if (err) {
            throw err;
        } else {
            console.log('Saved!');
        }
    });
}

// Checks for the lowest available id
function idPicker(array, task) {
    let id = 1;
    while (array.find(task => task.id === id)) {
        id++;
    }
    return id;
}

// Task class
class Task {
    constructor(task) {
        this.id = idPicker(tasks, task); // id is assigned based on the lowest available id
        this.task = task;
    }
};

// Add a new task
app.post('/api/tasks', (req, res) => {
    if (!req.body.task || req.body.task.length <= 3) {
        res.status(400).send('Task is required and should be at least 3 characters long.');
        return;
    }
    const newTask = new Task(req.body.task);
    tasks.push(newTask);
    res.send(newTask);
    console.log(tasks);
    saveTasks('taskLog.json', tasks);
});
    
// List all tasks
app.get('/api/tasks', (req, res) => {
    res.send(tasks);
    console.log(tasks);
});

// List a single task
app.get('/api/tasks/:id', (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).send('The task with the given ID was not found.');
    } else {
        res.send(task);
        console.log(task);
    }
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
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
        console.log(tasks);
    }
    saveTasks('taskLog.json', tasks);
});

// Remove a task
app.delete('/api/tasks/:id', (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).send('The task with the given ID was not found.');
    } else {
        const index = tasks.indexOf(task);
        tasks.splice(index, 1);
        res.send(task);
        console.log(tasks);
    }
    saveTasks('taskLog.json', tasks);
});
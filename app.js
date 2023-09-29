const fs = require('fs');
const express = require('express');
const TestApplication = require('./middleware/logger.js');
const tasksInMemory = require('./routes/tasksInMemory.js');
const tasksDB = require('./routes/tasksDB.js');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/tasks/inmemory', tasksInMemory);
app.use('/api/tasks', tasksDB);


// When the application is loaded, append a message to the logger.txt file
let testApplication = new TestApplication;

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

app.listen(PORT, () => {
    fs.appendFile('logger.txt', `Server listening on port: ${PORT}\n`, (err) => {
        if (err) {
            fs.appendFile('logger.txt', `Error: ${err}\n`, (err) => {
                if (err) {
                    throw err;
                }
            });
        }
    });
});
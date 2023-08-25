// Import the fs module
const fs = require('fs');

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
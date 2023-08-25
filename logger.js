// Import the event emitter
const eventEmitter = require('events');

// Create a TestApplication class that extends the event emitter
class TestApplication extends eventEmitter {
    // Create a method to load the application
    loadApplication(message) {
        // Emit the loadApplication event
        this.emit('loadApplication');
        // Output the message to the console
        console.log(message);
    }
}

// Export the TestApplication class
module.exports = TestApplication;
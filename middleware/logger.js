const eventEmitter = require('events');

class TestApplication extends eventEmitter {
    loadApplication(message) {
        this.emit('loadApplication');
        console.log(message);
    }
}

module.exports = TestApplication;
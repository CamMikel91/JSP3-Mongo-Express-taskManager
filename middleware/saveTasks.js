const fs = require('fs');
function saveTasks(file, array) {
    fs.writeFile(file, JSON.stringify(array), (err) => {
        if (err) {
            throw err;
        } else {
            console.log('Saved!');
        }
    });
}

module.exports = saveTasks;
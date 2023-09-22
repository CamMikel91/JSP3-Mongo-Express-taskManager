const express = require('express');
const router = express.Router();

// Checks for the lowest available id
function idPicker(array, task) {
    let id = 1;
    while (array.find(task => task.id === id)) {
        id++;
    }
    return id;
}

module.exports = idPicker;
// Checks for the lowest available id
function idPicker(array) {
    let id = 1;
    while (array.find(task => task.id === id)) {
        id++;
    }
    return id;
}

module.exports = idPicker;
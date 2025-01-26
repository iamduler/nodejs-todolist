const fs = require('fs'); // file system (built-in)

const getAll = () => {
    const buffer = fs.readFileSync('task.json');
    const dataString = buffer.toString(); // Convert to string
    const dataJSON = JSON.parse(dataString); // Convert to JSON
    
    return dataJSON;
}

const createTask = (title, desc) => {
    const newTask = {
        id: Math.random().toString(),
        title: title,
        desc: desc
    }

    let allTask = getAll();
    allTask = [...allTask, newTask];

    fs.writeFileSync('task.json', JSON.stringify(allTask));

    return newTask;
}

const retrieveTask = (id) => {
    const allTask = getAll();
    const task = allTask.find((task) => task.id === id);

    return task;
}

const updateTask = (id, title = '', description = '') => {
    let allTask = getAll();
    const index = allTask.findIndex((task) => task.id === id);

    if (index !== -1) {
        if (title) allTask[index].title = title;
        if (description) allTask[index].description = description;

        fs.writeFileSync('task.json', JSON.stringify(allTask));

        return allTask[index];
    }
    else {
        return false;
    }
}

const deleteTask = (id) => {
    let allTask = getAll();
    const index = allTask.findIndex((task) => task.id === id);

    if (index !== -1) {
        allTask = allTask.filter((task) => task.id !== id);
        fs.writeFileSync('task.json', JSON.stringify(allTask));

        return true;
    }
    else {
        return false;
    }
}

module.exports = {
    getAll,
    createTask,
    retrieveTask,
    updateTask,
    deleteTask
}
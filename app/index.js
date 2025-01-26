// import yargs from "yargs"; // For ES6

const yargs = require('yargs');
const fs = require('fs'); // file system (built-in)
const { getAll, createTask, retrieveTask, updateTask, deleteTask } = require('./model/task.js');

// Tạo lệnh test
// Command: node app/index.js test
yargs.command({
    command: "test",
    handler: () => {
        console.log('test');
    }
});

// CRUD
// create - node app/index.js create
yargs.command({
    command: "create",
    buidler: {
        title: {
            type: 'string'
        },
        desc: {
            type: 'string'
        },
    },
    handler: (args) => {
        const {title, desc} = args;
        const newTask = createTask(title, desc);

        console.log('Created task: ', newTask);
    }
});

// read-all - node app/index.js read-all
yargs.command({
    command: "read-all",
    handler: () => {
        const result = getAll();
        console.log('Result: ', result);
    }
});

// read-detail - node app/index.js read-detail
yargs.command({
    command: "read-detail",
    handler: (args) => {
        const { id } = args;
        const task = retrieveTask(id);

        if (task) {
            console.log('Task data: ', task);
        }
        else {
            console.log('Task not found!');
        }
    }
});

// update - node app/index.js update
yargs.command({
    command: "update",
    handler: (args) => {
        const { id, title, desc } = args;
        const task = updateTask(id, title, desc);

        if (task) {
            console.log('Task updated: ', task);
        }
        else {
            console.log('Task not found!');
        }
    }
});

// delete - node app/index.js delete
yargs.command({
    command: "delete",
    handler: (args) => {
        const { id, title, desc } = args;
        const result = deleteTask(id, title, desc);

        if (result) {
            console.log('Task deteted');
        }
        else {
            console.log('Task not found!');
        }
    }
});

yargs.parse(); // Lưu lại các lệnh vừa tạo
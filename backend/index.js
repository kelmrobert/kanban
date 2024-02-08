const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

///////////////////////////
// Data initialization
///////////////////////////

const columns = require('./data/columns.json');
const tags = require('./data/tags.json');
const http = require("http");

let taskIdCounter = 1;
columns.forEach(column => {
    taskIdCounter += column.tasks.length;
});

///////////////////////////
// Server setup
///////////////////////////

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'))
});

app.use('/assets', express.static(path.join(__dirname, '../frontend/dist/assets')));

///////////////////////////
// CRUD operations
///////////////////////////

//TODO: implement (see 6.1.3 - 6.1.9)

app.use(bodyParser.json())

// Get taskIdCounter
app.get('/api/counter', (req, res) => {
    res.status(200).json({taskIdCounter: taskIdCounter});
});

// Get tags
app.get('/api/tags', (req, res) => {
    res.status(200).json(tags);
});

// Get columns
app.get('/api/columns', (req, res) => {
    res.status(200).json(columns);
});

// Add new tasks to column
app.post('/api/tasks', (req, res) => {
    const { column, title, text, taskTags } = req.body;

    const newTaskId = 't' + (++taskIdCounter);
    const columnObj = columns.find(col => col.id === column);
    const newTask = { id: newTaskId, title: title, text: text, tags: taskTags };

    columnObj.tasks.push(newTask);

    res.status(201).json({id: newTaskId});
});

// Update task
app.put('/api/tasks/:id', (req, res) => {
    const id = req.params.id;
    const { title, text, taskTags } = req.body;

    let taskFound = false;
    columns.forEach(column => {
        column.tasks.forEach(task => {
            if(task.id === id){
                task.title = title;
                task.text = text;
                task.tags = taskTags;

                taskFound = true;
            }
        });
    });

    if (taskFound) {
        // Task updated
        res.status(200).json({ message: 'Task updated' });
    } else {
        // Task not found
        res.status(404).json({ message: 'Task not found' });
    }
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
    const id = req.params.id;

    let taskFound = false;
    let taskIndex = -1;
    let columnIndex = -1;

    // Search for the task and its index
    for (let i = 0; i < columns.length && taskFound === false; i++) {
        taskIndex = columns[i].tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            columnIndex = i;
            taskFound = true;
            break; // Stop the loop once the task is found
        }
    }

    // If the task was found, remove it
    if (taskFound) {
        columns[columnIndex].tasks.splice(taskIndex, 1); // Remove 1 item at taskIndex
        res.status(200).json({ message: 'Task removed' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Move task
app.put('/api/move-task/:id', (req, res) => {
    const id = req.params.id;
    const { newColumnId } = req.body;

    const newColumn = columns.find(col => col.id === newColumnId);

    let taskFound = false;
    let taskIndex = -1;
    let columnIndex = -1;

    // Search for the task and its index
    for (let i = 0; i < columns.length && taskFound === false; i++) {
        taskIndex = columns[i].tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            columnIndex = i;
            taskFound = true;
            newColumn.tasks.push(taskFound)
            break; // Stop the loop once the task is found
        }
    }

    // If the task was found, remove it
    if (taskFound) {
        columns[columnIndex].tasks.splice(taskIndex, 1); // Remove 1 item at taskIndex
        res.status(200).json({ message: 'Task moved' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});


///////////////////////////
// Start the server
///////////////////////////

app.listen(port, () => console.log(`Express Server ist listening on port ${port}...`));

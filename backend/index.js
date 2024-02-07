const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

///////////////////////////
// Data initialization
///////////////////////////

//TODO: implement (see 6.1.1)

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
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html')) // TODO correct?
});

app.listen(port, () => console.log(`Express Server ist listening on port ${port}...`));


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

    console.log(req.body)
    console.log(column, title, text, taskTags)

    const newTaskId = 't' + (++taskIdCounter);
    const columnObj = columns.find(col => col.id === column);
    const newTask = { id: newTaskId, title: title, text: text, tags: taskTags };

    console.log(newTaskId)
    console.log(columnObj)

    columnObj.tasks.push(newTask);

    res.status(201).json({id: newTaskId});
})

///////////////////////////
// Start the server
///////////////////////////

//TODO: implement (see 6.1.2)

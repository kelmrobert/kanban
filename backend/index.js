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

// Get taskIdCounter
app.get('/api/counter', (req, res) => {
    console.log(taskIdCounter)
    res.status(200).json({taskIdCounter: taskIdCounter});
});

///////////////////////////
// Start the server
///////////////////////////

//TODO: implement (see 6.1.2)

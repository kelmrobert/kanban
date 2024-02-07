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
taskIdCounter = columns.forEach(column => {
    taskIdCounter += column.tasks.length;
});

///////////////////////////
// Server setup
///////////////////////////

const port = 3000;

http.createServer((req, res) => {
    
}).listen(port, () => console.log(`Node.js server listening on port ${port}...`));

///////////////////////////
// CRUD operations
///////////////////////////

//TODO: implement (see 6.1.3 - 6.1.9)

///////////////////////////
// Start the server
///////////////////////////

//TODO: implement (see 6.1.2)

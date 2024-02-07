const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

///////////////////////////
// Data initialization
///////////////////////////

//TODO: implement (see 6.1.1)

const columns = require('./data/columns.json');
const tags = require('./data/tags.json');

let taskIdCounter = 1;
taskIdCounter = columns.forEach(column => {
    taskIdCounter += column.tasks.length;
});

///////////////////////////
// Server setup
///////////////////////////

//TODO: implement (see 6.1.2)

///////////////////////////
// CRUD operations
///////////////////////////

//TODO: implement (see 6.1.3 - 6.1.9)

///////////////////////////
// Start the server
///////////////////////////

//TODO: implement (see 6.1.2)

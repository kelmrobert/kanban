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


///////////////////////////
// CRUD operations
///////////////////////////

//TODO: implement (see 6.1.3 - 6.1.9)

///////////////////////////
// Start the server
///////////////////////////

//TODO: implement (see 6.1.2)

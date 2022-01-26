const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require('../database');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
// Middlewares
app.use(morgan('dev'));
app.use(express.json());
// Routes
app.use('/api/tasks' ,require('../routes/task.routes'))
// Static files
//console.log("log: ", __dirname.substring(0, __dirname.length - 8));
app.use(express.static(__dirname.substring(0, __dirname.length - 8)));
// Starting the server

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
})
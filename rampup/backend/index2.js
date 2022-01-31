const express = require('express');
const morgan = require('morgan');
var cors = require('cors');
const { mongoose } = require('./database');

const app = express();

// Settings
// process.env.port => variable de entorno
app.set('port', process.env.PORT || 8000);
// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
// Routes
app.use('/api/tasks' ,require('./routes/task.routes'))
// Static files
//console.log("log: ", __dirname.substring(0, __dirname.length - 8));
app.use(express.static(__dirname.substring(0, __dirname.length - 8)));
// Starting the server

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
})
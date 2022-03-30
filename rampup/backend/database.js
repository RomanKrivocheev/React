const mongoose = require('mongoose');
const URI = 'mongodb://localhost/mern-tasks';
// Here we can use an api of an online bd
mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;
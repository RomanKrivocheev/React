const mongoose = require('mongoose');
const {Schema} = mongoose;

const TaskSchema = new Schema({
    id: {type: Number, required: true},
    task: {type: String, required: true},
    complete: {type: Boolean, required: true}
});

module.exports = mongoose.model('Task', TaskSchema);
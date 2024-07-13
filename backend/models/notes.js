const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    instruction: {
        type: String,
        required: true
    }
});

const Notemodel = mongoose.model('NoteData', noteSchema);
module.exports = Notemodel;

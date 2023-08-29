const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.String,
        ref: 'user'
    },
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    keyword: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
    }
})

module.exports = Note = mongoose.model('note', NoteSchema)
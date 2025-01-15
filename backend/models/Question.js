const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Genel', 'İş', 'Aile', 'Sosyal', 'Kişisel'],
        required: true
    },
    type: {
        type: String,
        enum: ['scale', 'text'],
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question; 
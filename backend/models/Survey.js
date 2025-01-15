const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questions: [{
        questionText: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        emotionScore: {
            type: Number,
            min: -1,
            max: 1
        }
    }],
    overallMood: {
        type: String,
        enum: ['Çok İyi', 'İyi', 'Nötr', 'Kötü', 'Çok Kötü'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Survey', surveySchema); 
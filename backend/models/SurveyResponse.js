const mongoose = require('mongoose');

const surveyResponseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    answers: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: true
        },
        type: {
            type: String,
            enum: ['scale', 'text'],
            required: true
        },
        score: {
            type: Number,
            min: 1,
            max: 5,
            required: function() {
                return this.type === 'scale';
            }
        },
        textAnswer: {
            type: String,
            required: function() {
                return this.type === 'text';
            }
        },
        category: {
            type: String,
            enum: ['Genel', 'İş', 'Aile', 'Sosyal', 'Kişisel'],
            required: true
        }
    }],
    analysis: {
        overallMood: {
            type: String,
            required: true
        },
        moodScore: {
            type: Number,
            required: true
        },
        categoryAnalysis: {
            Genel: {
                score: Number,
                sentiment: String
            },
            İş: {
                score: Number,
                sentiment: String
            },
            Aile: {
                score: Number,
                sentiment: String
            },
            Sosyal: {
                score: Number,
                sentiment: String
            },
            Kişisel: {
                score: Number,
                sentiment: String
            }
        },
        textAnalysis: [{
            category: String,
            sentiment: String,
            confidence: Number
        }],
        recommendations: [{
            type: String,
            content: String
        }]
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Kategori bazlı ortalama puan hesaplama
surveyResponseSchema.methods.calculateCategoryAverage = function(category) {
    const categoryAnswers = this.answers.filter(
        answer => answer.category === category && answer.type === 'scale'
    );
    
    if (categoryAnswers.length === 0) return 0;
    
    const sum = categoryAnswers.reduce((acc, answer) => acc + answer.score, 0);
    return sum / categoryAnswers.length;
};

const SurveyResponse = mongoose.model('SurveyResponse', surveyResponseSchema);

module.exports = SurveyResponse; 
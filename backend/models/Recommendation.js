const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    mood: {
        type: String,
        required: true,
        enum: ['pozitif', 'negatif', 'nötr']
    },
    category: {
        type: String,
        required: true,
        enum: ['Kişisel', 'İş', 'Aile', 'Sosyal']
    },
    type: {
        type: String,
        required: true,
        enum: ['müzik', 'aktivite', 'kitap', 'hobi']
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    additionalInfo: String,
    effectiveness: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    usageCount: {
        type: Number,
        default: 0
    },
    positiveFeeback: {
        type: Number,
        default: 0
    },
    metadata: {
        genre: String,
        duration: String,
        difficulty: String,
        tags: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Öneri etkileşimlerini takip etmek için
recommendationSchema.methods.trackUsage = function() {
    this.usageCount += 1;
    return this.save();
};

// Pozitif geri bildirim eklemek için
recommendationSchema.methods.addPositiveFeedback = function() {
    this.positiveFeeback += 1;
    this.effectiveness = (this.positiveFeeback / this.usageCount) * 5;
    return this.save();
};

// Etkinlik skorunu güncelle
recommendationSchema.methods.updateEffectiveness = function() {
    if (this.usageCount > 0) {
        this.effectiveness = (this.positiveFeeback / this.usageCount) * 5;
        return this.save();
    }
    return this;
};

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation; 
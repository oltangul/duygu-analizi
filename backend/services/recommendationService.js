const recommendations = require('../data/recommendations');

class RecommendationService {
    constructor() {
        this.recommendations = recommendations;
    }

    // Duygu durumuna göre öneriler getir
    getRecommendationsByMood(mood) {
        return this.recommendations[mood] || this.recommendations.nötr;
    }

    // Kategoriye göre öneriler getir
    getRecommendationsByCategory(mood, category) {
        const moodRecs = this.getRecommendationsByMood(mood);
        return moodRecs[category] || [];
    }

    // Kişiselleştirilmiş öneriler
    getPersonalizedRecommendations(surveyResponse) {
        const { overallMood, categoryAnalysis } = surveyResponse.analysis;
        const baseRecommendations = this.getRecommendationsByMood(overallMood);

        // Her kategori için en uygun önerileri seç
        const personalizedRecs = {
            music: this.selectRandomItems(baseRecommendations.music, 3),
            books: this.selectRandomItems(baseRecommendations.books, 3),
            movies: this.selectRandomItems(baseRecommendations.movies, 3),
            hobbies: this.selectRandomItems(baseRecommendations.hobbies, 3)
        };

        return {
            recommendations: personalizedRecs,
            mood: overallMood,
            categoryAnalysis
        };
    }

    // Rastgele öğeler seç
    selectRandomItems(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
}

module.exports = new RecommendationService(); 
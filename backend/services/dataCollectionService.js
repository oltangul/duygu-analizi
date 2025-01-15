const SurveyResponse = require('../models/SurveyResponse');
const Question = require('../models/Question');
const sentimentAnalyzer = require('./sentimentAnalyzer');

class DataCollectionService {
    // Anket cevaplarını topla ve etiketle
    async collectAndLabelData() {
        try {
            const responses = await SurveyResponse.find({})
                .populate({
                    path: 'answers.questionId',
                    model: 'Question'
                });

            const labeledData = [];

            for (const response of responses) {
                // Puanlama sorularından genel duygu durumu hesapla
                const scaleAnswers = response.answers.filter(a => a.type === 'scale');
                const averageScore = this.calculateAverageScore(scaleAnswers);
                const moodLabel = this.getMoodLabel(averageScore);

                // Metin cevaplarını analiz et
                const textAnswers = response.answers.filter(a => a.type === 'text');
                for (const answer of textAnswers) {
                    if (answer.textAnswer && answer.textAnswer.trim()) {
                        labeledData.push({
                            text: answer.textAnswer,
                            sentiment: moodLabel,
                            category: answer.category,
                            score: averageScore
                        });
                    }
                }
            }

            return labeledData;
        } catch (error) {
            console.error('Veri toplama hatası:', error);
            throw error;
        }
    }

    // Ortalama puanı hesapla
    calculateAverageScore(scaleAnswers) {
        if (scaleAnswers.length === 0) return 3;
        const total = scaleAnswers.reduce((sum, answer) => sum + answer.score, 0);
        return total / scaleAnswers.length;
    }

    // Puana göre duygu etiketi belirle
    getMoodLabel(averageScore) {
        if (averageScore >= 4) return 'pozitif';
        if (averageScore <= 2) return 'negatif';
        return 'nötr';
    }

    // Veri setini kaydet
    async saveDataset(labeledData) {
        try {
            // Veri setini JSON olarak kaydet
            const fs = require('fs').promises;
            await fs.writeFile(
                './data/trainingData.json',
                JSON.stringify(labeledData, null, 2)
            );
            console.log(`${labeledData.length} adet etiketlenmiş veri kaydedildi`);
        } catch (error) {
            console.error('Veri seti kaydetme hatası:', error);
            throw error;
        }
    }
}

module.exports = new DataCollectionService(); 
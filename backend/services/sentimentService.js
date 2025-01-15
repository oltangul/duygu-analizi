const tf = require('@tensorflow/tfjs-node');

class SentimentService {
    constructor() {
        this.model = null;
        this.vocab = null;
        this.maxLength = 100;
    }

    // Puanlama bazlı değerlendirme
    calculateMoodFromScores(scores) {
        const totalScore = scores.reduce((sum, score) => sum + score, 0);
        const averageScore = totalScore / scores.length;

        if (averageScore >= 4.5) return { mood: 'Çok Mutlu', category: 'pozitif', score: averageScore };
        if (averageScore >= 3.5) return { mood: 'Mutlu', category: 'pozitif', score: averageScore };
        if (averageScore >= 2.5) return { mood: 'Nötr', category: 'nötr', score: averageScore };
        if (averageScore >= 1.5) return { mood: 'Mutsuz', category: 'negatif', score: averageScore };
        return { mood: 'Çok Mutsuz', category: 'negatif', score: averageScore };
    }

    // Metin bazlı duygu analizi
    async analyzeText(text) {
        const processedText = this.preprocessText(text);
        
        // Model henüz eğitilmediği için basit kelime bazlı analiz yapalım
        const positiveWords = ['mutlu', 'güzel', 'harika', 'muhteşem', 'sevindim', 'başardım'];
        const negativeWords = ['üzgün', 'kötü', 'mutsuz', 'başarısız', 'yorgun', 'kırgın'];
        
        let positiveCount = 0;
        let negativeCount = 0;
        
        processedText.forEach(word => {
            if (positiveWords.includes(word)) positiveCount++;
            if (negativeWords.includes(word)) negativeCount++;
        });
        
        if (positiveCount > negativeCount) return { sentiment: 'pozitif', confidence: 0.7 };
        if (negativeCount > positiveCount) return { sentiment: 'negatif', confidence: 0.7 };
        return { sentiment: 'nötr', confidence: 0.5 };
    }

    // Hibrit analiz
    async analyzeSurveyResponse(response) {
        // 1. Puanlama bazlı değerlendirme
        const scaleResponses = response.answers.filter(a => a.type === 'scale');
        const scores = scaleResponses.map(a => a.score);
        const moodAnalysis = this.calculateMoodFromScores(scores);

        // 2. Metin bazlı değerlendirme
        const textResponses = response.answers.filter(a => a.type === 'text');
        const textAnalyses = await Promise.all(
            textResponses.map(a => this.analyzeText(a.answer))
        );

        // 3. Sonuçları birleştir
        const textSentiments = textAnalyses.map(a => a.sentiment);
        const dominantTextSentiment = this.findDominantSentiment(textSentiments);

        return {
            overallMood: moodAnalysis.mood,
            moodScore: moodAnalysis.score,
            moodCategory: moodAnalysis.category,
            textualAnalysis: {
                sentiment: dominantTextSentiment,
                details: textAnalyses
            },
            recommendations: this.getRecommendations(moodAnalysis.category, dominantTextSentiment)
        };
    }

    findDominantSentiment(sentiments) {
        const counts = sentiments.reduce((acc, sentiment) => {
            acc[sentiment] = (acc[sentiment] || 0) + 1;
            return acc;
        }, {});
        
        return Object.entries(counts)
            .sort(([,a], [,b]) => b - a)[0][0];
    }

    getRecommendations(moodCategory, textSentiment) {
        // Mood ve text analizine göre özelleştirilmiş öneriler
        const recommendations = {
            pozitif: [
                'Bu pozitif enerjiyi sürdürmek için sevdiğiniz aktivitelere zaman ayırın',
                'Başkalarına yardım ederek mutluluğunuzu paylaşın',
                'Bugünün güzel anılarını not edin'
            ],
            nötr: [
                'Kendinize özel zaman ayırın',
                'Sevdiğiniz bir hobiye vakit ayırın',
                'Kısa bir yürüyüşe çıkın'
            ],
            negatif: [
                'Profesyonel destek almaktan çekinmeyin',
                'Sevdiklerinizle duygularınızı paylaşın',
                'Nefes egzersizleri yapın'
            ]
        };

        return recommendations[moodCategory] || recommendations.nötr;
    }

    async loadModel() {
        try {
            // Model yükleme işlemi (Eğitimden sonra implement edilecek)
            this.model = await tf.loadLayersModel('file://./models/sentiment_model/model.json');
            console.log('Model başarıyla yüklendi');
        } catch (error) {
            console.error('Model yükleme hatası:', error);
            throw error;
        }
    }

    preprocessText(text) {
        // Metin ön işleme
        return text.toLowerCase()
            .replace(/[.,!?\\-]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .split(' ');
    }

    async analyzeSentiment(text) {
        try {
            if (!this.model) {
                throw new Error('Model henüz yüklenmedi');
            }

            const processedText = this.preprocessText(text);
            // Token'laştırma ve model tahmini işlemleri burada yapılacak
            
            // Şimdilik basit bir mock yanıt dönelim
            return {
                text: text,
                sentiment: 'nötr',
                confidence: 0.5
            };
        } catch (error) {
            console.error('Duygu analizi hatası:', error);
            throw error;
        }
    }

    async trainModel(dataset) {
        // Model eğitimi burada implement edilecek
        try {
            const model = tf.sequential();
            
            // Model mimarisi
            model.add(tf.layers.embedding({
                inputDim: 10000, // Vocabulary size
                outputDim: 32,
                inputLength: this.maxLength
            }));
            
            model.add(tf.layers.globalAveragePooling1d());
            model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
            model.add(tf.layers.dropout(0.2));
            model.add(tf.layers.dense({ units: 3, activation: 'softmax' })); // 3 sınıf: pozitif, negatif, nötr

            // Model derleme
            model.compile({
                optimizer: 'adam',
                loss: 'categoricalCrossentropy',
                metrics: ['accuracy']
            });

            this.model = model;
            return model;
        } catch (error) {
            console.error('Model eğitim hatası:', error);
            throw error;
        }
    }

    labelSurveyResponse(answers) {
        const labeledData = [];
        
        answers.forEach(answer => {
            let sentiment;
            const score = answer.score;
            
            // Puana göre duygu etiketi belirleme
            if (score >= 4) {
                sentiment = 'pozitif';
            } else if (score === 3) {
                sentiment = 'nötr';
            } else {
                sentiment = 'negatif';
            }
            
            labeledData.push({
                text: answer.answer,
                score: score,
                sentiment: sentiment
            });
        });
        
        return labeledData;
    }

    async buildTrainingDataset() {
        try {
            // MongoDB'den tüm anket cevaplarını çek
            const SurveyResponse = require('../models/SurveyResponse');
            const allResponses = await SurveyResponse.find({});
            
            let trainingData = [];
            
            // Her bir anket cevabını etiketle
            allResponses.forEach(response => {
                const labeledAnswers = this.labelSurveyResponse(response.answers);
                trainingData = trainingData.concat(labeledAnswers);
            });
            
            return trainingData;
        } catch (error) {
            console.error('Veri seti oluşturma hatası:', error);
            throw error;
        }
    }
}

module.exports = new SentimentService(); 
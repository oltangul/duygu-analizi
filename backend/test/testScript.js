const mongoose = require('mongoose');
const Survey = require('../models/Survey');
const testData = require('./testData.json');

async function runTest() {
    try {
        // MongoDB'ye bağlan
        await mongoose.connect('mongodb://127.0.0.1:27017/duygu-analizi', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB bağlantısı başarılı');

        // Test verisini kaydet
        const survey = new Survey({
            userId: testData.userId,
            questions: testData.answers,
            totalScore: testData.answers.reduce((total, answer) => total + answer.score, 0),
            moodRange: 'Olumlu ve İyimser',
            recommendations: [
                {
                    type: 'müzik',
                    content: 'Enerjik pop şarkıları'
                },
                {
                    type: 'aktivite',
                    content: 'Grup sporları'
                },
                {
                    type: 'kitap',
                    content: 'İlham verici başarı hikayeleri'
                },
                {
                    type: 'hobi',
                    content: 'Dans etme'
                },
                {
                    type: 'öneri',
                    content: 'Yeni projeler başlatma'
                }
            ]
        });

        await survey.save();
        console.log('Test verisi başarıyla kaydedildi');

        // Kaydedilen veriyi kontrol et
        const savedSurvey = await Survey.findOne({ userId: testData.userId });
        console.log('Kaydedilen veri:', savedSurvey);

    } catch (error) {
        console.error('Hata:', error);
    } finally {
        // Bağlantıyı kapat
        await mongoose.connection.close();
        console.log('MongoDB bağlantısı kapatıldı');
    }
}

runTest(); 
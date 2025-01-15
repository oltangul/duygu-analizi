const mongoose = require('mongoose');
const Recommendation = require('../models/Recommendation');

mongoose.connect('mongodb://127.0.0.1:27017/duygu-analizi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB\'ye başarıyla bağlandı');
}).catch(err => {
    console.error('MongoDB bağlantı hatası:', err);
});

async function simulateFeedback() {
    try {
        // Tüm önerileri al
        const recommendations = await Recommendation.find();
        
        // Her öneri için simüle edilmiş geri bildirimler ekle
        for (const recommendation of recommendations) {
            // Ruh haline göre başarı oranını belirle
            let successRate;
            if (recommendation.mood === 'negatif') {
                // Negatif ruh hali için öneriler
                if (recommendation.type === 'müzik' || recommendation.type === 'aktivite') {
                    successRate = 0.8; // Müzik ve aktiviteler daha etkili
                } else {
                    successRate = 0.6;
                }
            } else if (recommendation.mood === 'pozitif') {
                // Pozitif ruh hali için öneriler
                successRate = 0.7;
            } else {
                // Nötr ruh hali için öneriler
                successRate = 0.65;
            }

            // Simüle edilmiş kullanım sayısı (10-20 arası rastgele)
            const usageCount = Math.floor(Math.random() * 11) + 10;
            
            // Başarı oranına göre pozitif geri bildirim sayısını hesapla
            const positiveFeedbackCount = Math.floor(usageCount * successRate);

            // Öneriyi güncelle
            recommendation.usageCount = usageCount;
            recommendation.positiveFeeback = positiveFeedbackCount;
            recommendation.effectiveness = (positiveFeedbackCount / usageCount) * 5;

            await recommendation.save();
            console.log(`"${recommendation.title}" için geri bildirimler eklendi:`);
            console.log(`- Kullanım: ${usageCount}`);
            console.log(`- Pozitif: ${positiveFeedbackCount}`);
            console.log(`- Etkinlik: ${recommendation.effectiveness.toFixed(2)}`);
            console.log('------------------------');
        }

        console.log('Tüm geri bildirimler başarıyla eklendi');
        mongoose.connection.close();
    } catch (error) {
        console.error('Geri bildirim ekleme hatası:', error);
        mongoose.connection.close();
    }
}

simulateFeedback(); 
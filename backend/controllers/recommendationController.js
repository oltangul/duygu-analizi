const Recommendation = require('../models/Recommendation');

// Öneri getirme fonksiyonu
const getRecommendations = async (req, res) => {
    try {
        const { mood, category } = req.query;
        
        // Mood ve category parametrelerini kontrol et
        if (!mood || !category) {
            return res.status(400).json({
                success: false,
                message: 'Ruh hali ve kategori belirtilmelidir'
            });
        }

        // Veritabanından önerileri getir
        const recommendations = await Recommendation.find({
            mood: mood,
            category: category
        }).sort({ effectiveness: -1 }).limit(3);

        if (!recommendations || recommendations.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Bu kriterlere uygun öneri bulunamadı'
            });
        }

        res.json({
            success: true,
            data: recommendations
        });

    } catch (error) {
        console.error('Öneri getirme hatası:', error);
        res.status(500).json({
            success: false,
            message: 'Öneriler getirilirken bir hata oluştu'
        });
    }
};

// Öneri geri bildirimi alma fonksiyonu
const addRecommendationFeedback = async (req, res) => {
    try {
        const { recommendationId, isEffective } = req.body;

        // Öneriyi bul ve güncelle
        const recommendation = await Recommendation.findById(recommendationId);
        if (!recommendation) {
            return res.status(404).json({
                success: false,
                message: 'Öneri bulunamadı'
            });
        }

        // Kullanım sayısını ve pozitif geri bildirim sayısını güncelle
        recommendation.usageCount += 1;
        if (isEffective) {
            recommendation.positiveFeeback = (recommendation.positiveFeeback || 0) + 1;
        }

        // Etkinlik skorunu güncelle
        recommendation.effectiveness = (recommendation.positiveFeeback / recommendation.usageCount) * 5;

        await recommendation.save();

        res.json({
            success: true,
            message: 'Geri bildirim başarıyla kaydedildi'
        });

    } catch (error) {
        console.error('Geri bildirim hatası:', error);
        res.status(500).json({
            success: false,
            message: 'Geri bildirim kaydedilirken bir hata oluştu'
        });
    }
};

module.exports = {
    getRecommendations,
    addRecommendationFeedback
}; 
const Survey = require('../models/Survey');

// Yeni anket oluştur
const createSurvey = async (req, res) => {
    try {
        const { questions, overallMood, notes } = req.body;
        const userId = req.user.id; // Auth middleware'den gelecek

        const survey = new Survey({
            userId,
            questions,
            overallMood,
            notes
        });

        await survey.save();
        res.status(201).json({
            message: 'Anket başarıyla kaydedildi',
            survey
        });
    } catch (error) {
        console.error('Anket oluşturma hatası:', error);
        res.status(500).json({
            message: 'Anket oluşturulurken bir hata oluştu',
            error: error.message
        });
    }
};

// Kullanıcının anketlerini getir
const getUserSurveys = async (req, res) => {
    try {
        const userId = req.user.id;
        const surveys = await Survey.find({ userId })
            .sort({ date: -1 }); // En yeniden eskiye sırala

        res.status(200).json(surveys);
    } catch (error) {
        console.error('Anketleri getirme hatası:', error);
        res.status(500).json({
            message: 'Anketler getirilirken bir hata oluştu',
            error: error.message
        });
    }
};

// Belirli bir anketi getir
const getSurveyById = async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id);
        if (!survey) {
            return res.status(404).json({ message: 'Anket bulunamadı' });
        }

        // Kullanıcı sadece kendi anketlerini görebilir
        if (survey.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Bu ankete erişim izniniz yok' });
        }

        res.status(200).json(survey);
    } catch (error) {
        console.error('Anket getirme hatası:', error);
        res.status(500).json({
            message: 'Anket getirilirken bir hata oluştu',
            error: error.message
        });
    }
};

module.exports = {
    createSurvey,
    getUserSurveys,
    getSurveyById
}; 
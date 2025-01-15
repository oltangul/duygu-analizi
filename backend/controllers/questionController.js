const Question = require('../models/Question');

// Tüm soruları getir
const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find()
            .sort({ order: 1, category: 1 })
            .select('text category type options order followUpQuestion');
        
        res.json(questions);
    } catch (error) {
        console.error('Sorular getirilirken hata:', error);
        res.status(500).json({
            message: 'Sorular getirilirken bir hata oluştu',
            error: error.message
        });
    }
};

// Kategori bazlı soruları getir
const getQuestionsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const questions = await Question.find({ category })
            .sort({ order: 1 })
            .select('text category type options order followUpQuestion');

        res.json(questions);
    } catch (error) {
        console.error('Sorular getirilirken hata:', error);
        res.status(500).json({
            message: 'Sorular getirilirken bir hata oluştu',
            error: error.message
        });
    }
};

module.exports = {
    getAllQuestions,
    getQuestionsByCategory
}; 
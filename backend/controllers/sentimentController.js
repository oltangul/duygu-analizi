const sentimentService = require('../services/sentimentService');

const analyzeSentiment = async (req, res) => {
    try {
        const { text } = req.body;
        
        if (!text) {
            return res.status(400).json({ message: 'Metin alanı gereklidir' });
        }

        const analysis = await sentimentService.analyzeSentiment(text);
        res.json(analysis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const analyzeAnswers = async (answers) => {
    try {
        const results = [];
        for (const answer of answers) {
            const analysis = await sentimentService.analyzeSentiment(answer);
            results.push(analysis);
        }
        return results;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    analyzeSentiment,
    analyzeAnswers
}; 
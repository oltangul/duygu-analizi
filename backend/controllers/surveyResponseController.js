const SurveyResponse = require('../models/SurveyResponse');
const Question = require('../models/Question');
const sentimentAnalyzer = require('../services/sentimentAnalyzer');

// Yeni anket yanıtı oluştur
const createSurveyResponse = async (req, res) => {
    try {
        const { answers } = req.body;
        const userId = req.user._id;

        // Debug: Gelen yanıtları logla
        console.log('Gelen Yanıtlar:', JSON.stringify(answers, null, 2));

        // Tüm soruların var olduğunu kontrol et
        const questionIds = answers.map(answer => answer.questionId);
        const questions = await Question.find({ _id: { $in: questionIds } });
        
        if (questions.length !== answers.length) {
            return res.status(400).json({
                message: 'Bazı sorular bulunamadı'
            });
        }

        // Kategorilere göre cevapları grupla
        const categorizedAnswers = {};
        answers.forEach(answer => {
            const question = questions.find(q => q._id.toString() === answer.questionId);
            if (!question) return;
            
            if (!categorizedAnswers[question.category]) {
                categorizedAnswers[question.category] = {
                    textAnswers: [],
                    scaleScores: [],
                    answers: []
                };
            }

            // Debug: Her yanıtın kategorisini ve değerini logla
            console.log('İşlenen Yanıt:', {
                category: question.category,
                type: answer.type,
                score: answer.score,
                text: answer.textAnswer
            });

            categorizedAnswers[question.category].answers.push({
                ...answer,
                question: question
            });

            if (answer.type === 'text' && answer.textAnswer) {
                categorizedAnswers[question.category].textAnswers.push(answer.textAnswer);
            } else if (answer.type === 'scale' && answer.score) {
                categorizedAnswers[question.category].scaleScores.push(answer.score);
            }
        });

        // Her kategori için duygu analizi yap
        const categoryAnalysis = {};
        let overallScore = 0;
        let overallConfidence = 0;
        let categoryCount = 0;
        let totalNegativeCount = 0;
        let totalAnswerCount = 0;

        for (const category in categorizedAnswers) {
            const { textAnswers, scaleScores, answers: categoryAnswers } = categorizedAnswers[category];
            
            // Debug: Kategori analizi öncesi verileri logla
            console.log('Kategori Analizi Girdisi:', {
                category,
                textAnswers,
                scaleScores
            });

            const analysis = sentimentAnalyzer.analyzeMultipleTexts(textAnswers, scaleScores, category);
            
            // Debug: Analiz sonucunu logla
            console.log('Kategori Analizi Sonucu:', {
                category,
                analysis
            });

            categoryAnalysis[category] = {
                sentiment: analysis.overall.sentiment,
                confidence: analysis.overall.confidence,
                weightedScore: analysis.overall.weightedScore,
                textAnalysis: analysis.textAnalysis,
                scaleAnalysis: analysis.scaleAnalysis,
                answers: categoryAnswers.map(answer => ({
                    questionText: answer.question.text,
                    type: answer.type,
                    ...(answer.type === 'text' ? { textAnswer: answer.textAnswer } : { score: answer.score })
                }))
            };

            if (analysis.overall.sentiment === 'negatif') {
                totalNegativeCount++;
            }
            totalAnswerCount++;

            overallScore += analysis.overall.weightedScore;
            overallConfidence += analysis.overall.confidence;
            categoryCount++;
        }

        // Debug: Genel skor hesaplamasını logla
        console.log('Genel Skor Hesaplaması:', {
            overallScore,
            categoryCount,
            averageScore: overallScore / categoryCount,
            totalNegativeCount,
            totalAnswerCount
        });

        let averageScore = overallScore / categoryCount;
        let averageConfidence = overallConfidence / categoryCount;

        // Negatif yanıtların oranına göre skoru ayarla
        const negativeRatio = totalNegativeCount / totalAnswerCount;
        if (negativeRatio >= 0.4) { // %40 veya daha fazla kategori negatifse
            averageScore = Math.min(averageScore * 1.5, -0.3); // Skoru negatife zorla
        }

        let overallMood = 'nötr';
        if (averageScore > 0.3) overallMood = 'pozitif';
        else if (averageScore < -0.1 || negativeRatio >= 0.3) overallMood = 'negatif';

        // Debug: Final sonucu logla
        console.log('Final Sonuç:', {
            overallMood,
            averageScore,
            averageConfidence,
            negativeRatio
        });

        const surveyResponse = new SurveyResponse({
            userId,
            answers: answers.map(answer => {
                const question = questions.find(q => q._id.toString() === answer.questionId);
                return {
                    ...answer,
                    category: question.category,
                    type: question.type
                };
            }),
            analysis: {
                overallMood,
                moodScore: Math.abs(averageScore),
                confidence: averageConfidence,
                categoryAnalysis: Object.keys(categoryAnalysis).reduce((acc, category) => {
                    acc[category] = {
                        sentiment: categoryAnalysis[category].sentiment,
                        confidence: categoryAnalysis[category].confidence,
                        weightedScore: categoryAnalysis[category].weightedScore
                    };
                    return acc;
                }, {}),
                textAnalysis: Object.entries(categoryAnalysis).map(([category, analysis]) => ({
                    category,
                    sentiment: analysis.sentiment,
                    confidence: analysis.confidence,
                    details: analysis.textAnalysis?.details || []
                }))
            },
            createdAt: new Date()
        });

        await surveyResponse.save();

        res.status(201).json({
            message: 'Anket yanıtları başarıyla kaydedildi',
            surveyResponse
        });
    } catch (error) {
        console.error('Anket yanıtı oluşturma hatası:', error);
        res.status(500).json({
            message: 'Anket yanıtları kaydedilirken bir hata oluştu',
            error: error.message
        });
    }
};

// En son anket yanıtını getir
const getLatestSurveyResponse = async (req, res) => {
    try {
        const userId = req.user._id;
        const latestResponse = await SurveyResponse.findOne({ userId })
            .sort({ createdAt: -1 })
            .limit(1);

        if (!latestResponse) {
            return res.status(404).json({
                message: 'Henüz bir anket yanıtınız bulunmuyor'
            });
        }

        res.json(latestResponse);
    } catch (error) {
        console.error('Son anket yanıtı getirilirken hata:', error);
        res.status(500).json({
            message: 'Son anket yanıtı getirilirken bir hata oluştu',
            error: error.message
        });
    }
};

// Kullanıcının tüm anket yanıtlarını getir
const getUserSurveyResponses = async (req, res) => {
    try {
        const userId = req.user._id;
        const responses = await SurveyResponse.find({ userId })
            .sort({ createdAt: -1 });

        res.json(responses);
    } catch (error) {
        console.error('Anket yanıtları getirilirken hata:', error);
        res.status(500).json({
            message: 'Anket yanıtları getirilirken bir hata oluştu',
            error: error.message
        });
    }
};

// Belirli bir anket yanıtını getir
const getSurveyResponseById = async (req, res) => {
    try {
        const userId = req.user._id;
        const responseId = req.params.id;

        const response = await SurveyResponse.findOne({
            _id: responseId,
            userId
        });

        if (!response) {
            return res.status(404).json({
                message: 'Anket yanıtı bulunamadı'
            });
        }

        res.json(response);
    } catch (error) {
        console.error('Anket yanıtı getirilirken hata:', error);
        res.status(500).json({
            message: 'Anket yanıtı getirilirken bir hata oluştu',
            error: error.message
        });
    }
};

// Haftalık duygu durum analizi
const getWeeklyMoodAnalysis = async (req, res) => {
    try {
        const userId = req.user._id;
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const responses = await SurveyResponse.find({
            userId,
            createdAt: { $gte: oneWeekAgo }
        }).sort({ createdAt: 1 });

        const analysis = {
            dailyMoods: {},
            overallMood: 'nötr',
            moodCounts: {
                pozitif: 0,
                negatif: 0,
                nötr: 0
            }
        };

        responses.forEach(response => {
            const date = response.createdAt.toISOString().split('T')[0];
            analysis.dailyMoods[date] = response.analysis.overallMood;
            analysis.moodCounts[response.analysis.overallMood]++;
        });

        // Genel ruh halini belirle
        const totalResponses = responses.length;
        if (totalResponses > 0) {
            if (analysis.moodCounts.pozitif > totalResponses * 0.5) {
                analysis.overallMood = 'pozitif';
            } else if (analysis.moodCounts.negatif > totalResponses * 0.3) {
                analysis.overallMood = 'negatif';
            }
        }

        res.json(analysis);
    } catch (error) {
        console.error('Haftalık analiz getirilirken hata:', error);
        res.status(500).json({
            message: 'Haftalık analiz getirilirken bir hata oluştu',
            error: error.message
        });
    }
};

module.exports = {
    createSurveyResponse,
    getUserSurveyResponses,
    getSurveyResponseById,
    getWeeklyMoodAnalysis,
    getLatestSurveyResponse
}; 
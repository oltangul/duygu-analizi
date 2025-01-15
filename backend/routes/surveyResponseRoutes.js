const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
    createSurveyResponse,
    getUserSurveyResponses,
    getSurveyResponseById,
    getWeeklyMoodAnalysis,
    getLatestSurveyResponse
} = require('../controllers/surveyResponseController');

// Yeni anket yanıtı oluştur
router.post('/', auth, createSurveyResponse);

// En son anket yanıtını getir - latest endpoint'i ID parametresinden önce olmalı
router.get('/my-latest', auth, getLatestSurveyResponse);

// Kullanıcının tüm anket yanıtlarını getir
router.get('/my-responses', auth, getUserSurveyResponses);

// Belirli bir anket yanıtını getir
router.get('/:id', auth, getSurveyResponseById);

// Haftalık duygu durum analizi
router.get('/analysis/weekly', auth, getWeeklyMoodAnalysis);

module.exports = router; 
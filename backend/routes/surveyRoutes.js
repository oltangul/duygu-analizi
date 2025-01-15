const express = require('express');
const router = express.Router();
const { 
    createSurveyResponse, 
    getUserSurveyResponses, 
    getSurveyResponseById,
    getWeeklyMoodAnalysis,
    getLatestSurveyResponse
} = require('../controllers/surveyResponseController');
const auth = require('../middleware/auth');

// Tüm route'lar auth middleware'i kullanacak
router.use(auth);

// Yeni anket yanıtı oluştur
router.post('/', createSurveyResponse);

// Kullanıcının tüm anket yanıtlarını getir
router.get('/user', getUserSurveyResponses);

// En son anket yanıtını getir
router.get('/latest', getLatestSurveyResponse);

// Haftalık analizi getir
router.get('/analysis/weekly', getWeeklyMoodAnalysis);

// Belirli bir anketi getir
router.get('/:id', getSurveyResponseById);

module.exports = router; 
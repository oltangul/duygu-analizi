const express = require('express');
const router = express.Router();
const { getRecommendations, addRecommendationFeedback } = require('../controllers/recommendationController');
const auth = require('../middleware/auth');

// Önerileri getir
router.get('/', auth, getRecommendations);

// Öneri geri bildirimi ekle
router.post('/feedback', auth, addRecommendationFeedback);

module.exports = router; 
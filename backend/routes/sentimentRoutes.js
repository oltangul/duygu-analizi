const express = require('express');
const router = express.Router();
const { analyzeSentiment } = require('../controllers/sentimentController');

// Tek bir metin için duygu analizi
router.post('/analyze', analyzeSentiment);

module.exports = router; 
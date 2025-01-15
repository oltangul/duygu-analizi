const express = require('express');
const router = express.Router();
const { getAllQuestions, getQuestionsByCategory } = require('../controllers/questionController');

// Tüm soruları getir
router.get('/', getAllQuestions);

// Kategori bazlı soruları getir
router.get('/category/:category', getQuestionsByCategory);

module.exports = router; 
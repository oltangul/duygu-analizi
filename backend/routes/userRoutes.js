const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { register, login, getProfile } = require('../controllers/userController');

// Kullanıcı kaydı
router.post('/register', register);

// Kullanıcı girişi
router.post('/login', login);

// Profil bilgileri
router.get('/profile', auth, getProfile);

module.exports = router; 
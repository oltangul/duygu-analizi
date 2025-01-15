const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Token oluşturma fonksiyonu
const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// Kullanıcı kaydı
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Email kontrolü
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'Bu email adresi zaten kullanımda'
            });
        }

        // Şifre hashleme
        const hashedPassword = await bcrypt.hash(password, 10);

        // Yeni kullanıcı oluşturma
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        // Token oluşturma
        const token = generateToken(user._id);

        res.status(201).json({
            message: 'Kullanıcı başarıyla oluşturuldu',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Kayıt hatası:', error);
        res.status(500).json({
            message: 'Kayıt işlemi başarısız oldu'
        });
    }
};

// Kullanıcı girişi
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kullanıcı kontrolü
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: 'Email veya şifre hatalı'
            });
        }

        // Şifre kontrolü
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Email veya şifre hatalı'
            });
        }

        // Token oluşturma
        const token = generateToken(user._id);

        res.json({
            message: 'Giriş başarılı',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Giriş hatası:', error);
        res.status(500).json({
            message: 'Giriş işlemi başarısız oldu'
        });
    }
};

// Profil bilgilerini getirme
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({
                message: 'Kullanıcı bulunamadı'
            });
        }

        res.json(user);
    } catch (error) {
        console.error('Profil hatası:', error);
        res.status(500).json({
            message: 'Profil bilgileri alınamadı'
        });
    }
};

module.exports = {
    register,
    login,
    getProfile
}; 
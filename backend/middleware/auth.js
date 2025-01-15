require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'Yetkilendirme token\'ı bulunamadı' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: decoded.userId };
        next();
    } catch (error) {
        console.error('Auth middleware hatası:', error);
        res.status(401).json({ message: 'Lütfen giriş yapın' });
    }
};

module.exports = auth; 
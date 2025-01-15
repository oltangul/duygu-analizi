const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*'
}));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// MongoDB bağlantısı
const MONGODB_URI = process.env.MONGODB_URI;
console.log('MongoDB URI:', MONGODB_URI);

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    family: 4
})
.then(() => {
    console.log('MongoDB\'ye başarıyla bağlandı');
})
.catch((error) => {
    console.error('MongoDB bağlantı hatası:', error);
});

// Ana route
app.get('/', (req, res) => {
    try {
        res.status(200).json({
            message: 'Duygu Analizi API çalışıyor',
            status: 'active',
            timestamp: new Date().toISOString(),
            routes: {
                register: '/api/users/register',
                login: '/api/users/login',
                profile: '/api/users/profile',
                questions: '/api/questions',
                questionsByCategory: '/api/questions/category/:category',
                surveyResponses: '/api/survey-responses',
                mySurveyResponses: '/api/survey-responses/my-responses',
                weeklyAnalysis: '/api/survey-responses/analysis/weekly'
            }
        });
    } catch (error) {
        console.error('Ana route hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası' });
    }
});

// Routes
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const surveyResponseRoutes = require('./routes/surveyResponseRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/survey-responses', surveyResponseRoutes);
app.use('/api/recommendations', recommendationRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Sayfa bulunamadı' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Hata:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
});

// Port ayarı
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
    console.log('Sunucu adresleri:');
    console.log('- http://localhost:' + PORT);
    console.log('- http://[::1]:' + PORT);
    console.log('- http://127.0.0.1:' + PORT);
}); 
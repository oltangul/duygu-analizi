const mongoose = require('mongoose');
const User = require('../models/User');
const SurveyResponse = require('../models/SurveyResponse');
const Question = require('../models/Question');
const sentimentAnalyzer = require('../services/sentimentAnalyzer');
require('dotenv').config();

const testUsers = [
    {
        email: 'mutlu@test.com',
        password: 'test123',
        name: 'Mutlu Kullanıcı'
    },
    {
        email: 'notr@test.com',
        password: 'test123',
        name: 'Nötr Kullanıcı'
    },
    {
        email: 'uzgun@test.com',
        password: 'test123',
        name: 'Üzgün Kullanıcı'
    }
];

const testQuestions = [
    {
        text: 'Genel olarak kendinizi nasıl hissediyorsunuz?',
        category: 'Genel',
        type: 'scale',
        order: 1
    },
    {
        text: 'Duygularınızı detaylı olarak anlatır mısınız?',
        category: 'Genel',
        type: 'text',
        order: 2
    },
    {
        text: 'İş/okul hayatınızda kendinizi nasıl hissediyorsunuz?',
        category: 'İş',
        type: 'scale',
        order: 3
    },
    {
        text: 'İş/okul hayatınızdaki deneyimlerinizi anlatır mısınız?',
        category: 'İş',
        type: 'text',
        order: 4
    },
    {
        text: 'Ailenizle ilişkilerinizi nasıl değerlendiriyorsunuz?',
        category: 'Aile',
        type: 'scale',
        order: 5
    }
];

const testResponses = {
    'mutlu@test.com': {
        scaleAnswers: {
            'Genel': 5,
            'İş': 4,
            'Aile': 5,
            'Sosyal': 4,
            'Kişisel': 5
        },
        textAnswers: {
            'Genel': 'Hayatımdan çok memnunum, her şey mükemmel gidiyor.',
            'İş': 'İşimde başarılı projeler yürütüyorum ve takdir görüyorum.',
            'Aile': 'Ailemle harika vakit geçiriyoruz, çok mutluyum.',
            'Sosyal': 'Arkadaşlarımla güzel aktiviteler yapıyoruz.',
            'Kişisel': 'Kendimi çok iyi ve enerjik hissediyorum.'
        }
    },
    'notr@test.com': {
        scaleAnswers: {
            'Genel': 3,
            'İş': 3,
            'Aile': 3,
            'Sosyal': 3,
            'Kişisel': 3
        },
        textAnswers: {
            'Genel': 'Hayat normal seyrinde devam ediyor.',
            'İş': 'İşler her zamanki gibi, özel bir durum yok.',
            'Aile': 'Ailemle normal ilişkilerimiz devam ediyor.',
            'Sosyal': 'Bazen arkadaşlarımla görüşüyorum.',
            'Kişisel': 'Kendimi normal hissediyorum.'
        }
    },
    'uzgun@test.com': {
        scaleAnswers: {
            'Genel': 1,
            'İş': 2,
            'Aile': 1,
            'Sosyal': 2,
            'Kişisel': 1
        },
        textAnswers: {
            'Genel': 'Son zamanlarda hiç iyi hissetmiyorum, her şey kötü gidiyor.',
            'İş': 'İşte sorunlar yaşıyorum ve stres altındayım.',
            'Aile': 'Ailemle bazı problemler yaşıyoruz.',
            'Sosyal': 'Kendimi yalnız hissediyorum.',
            'Kişisel': 'Çok yorgun ve mutsuzum.'
        }
    }
};

async function createTestData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB bağlantısı başarılı');

        // Mevcut test verilerini temizle
        await User.deleteMany({ email: { $in: testUsers.map(u => u.email) } });
        await Question.deleteMany({});
        console.log('Eski test verileri silindi');

        // Test sorularını oluştur
        const questions = await Question.insertMany(testQuestions);
        console.log('Test soruları oluşturuldu');

        // Test kullanıcılarını oluştur
        for (const userData of testUsers) {
            const user = new User(userData);
            await user.save();
            console.log(`Test kullanıcısı oluşturuldu: ${userData.email}`);

            // Kullanıcı için anket cevapları oluştur
            const responses = testResponses[userData.email];
            const surveyResponse = new SurveyResponse({
                userId: user._id,
                answers: [],
                analysis: {
                    overallMood: 'pozitif',
                    moodScore: 4.5,
                    categoryAnalysis: {
                        Genel: { score: 5, sentiment: 'pozitif' },
                        İş: { score: 4, sentiment: 'pozitif' },
                        Aile: { score: 5, sentiment: 'pozitif' },
                        Sosyal: { score: 4, sentiment: 'pozitif' },
                        Kişisel: { score: 5, sentiment: 'pozitif' }
                    },
                    textAnalysis: [],
                    recommendations: []
                }
            });

            // Her soru için cevap oluştur
            for (const question of questions) {
                if (question.type === 'scale') {
                    surveyResponse.answers.push({
                        questionId: question._id,
                        type: 'scale',
                        category: question.category,
                        score: responses.scaleAnswers[question.category]
                    });
                } else {
                    const textAnswer = responses.textAnswers[question.category];
                    const analysis = sentimentAnalyzer.analyzeText(textAnswer);
                    surveyResponse.answers.push({
                        questionId: question._id,
                        type: 'text',
                        category: question.category,
                        textAnswer: textAnswer
                    });
                    surveyResponse.analysis.textAnalysis.push({
                        category: question.category,
                        sentiment: analysis.sentiment,
                        confidence: analysis.confidence
                    });
                }
            }

            await surveyResponse.save();
            console.log(`${userData.email} için anket cevapları oluşturuldu`);
        }

        console.log('Test verileri başarıyla oluşturuldu');
        process.exit(0);
    } catch (error) {
        console.error('Test verisi oluşturma hatası:', error);
        process.exit(1);
    }
}

createTestData(); 
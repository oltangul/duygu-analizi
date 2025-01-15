const mongoose = require('mongoose');
const Recommendation = require('../models/Recommendation');

// MongoDB bağlantısı
mongoose.connect('mongodb://127.0.0.1:27017/duygu-analizi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB\'ye başarıyla bağlandı');
}).catch(err => {
    console.error('MongoDB bağlantı hatası:', err);
});

// Örnek öneriler
const recommendations = [
    // Negatif ruh hali için öneriler
    {
        mood: 'negatif',
        category: 'Kişisel',
        type: 'müzik',
        title: 'Sakinleştirici Klasik Müzik Listesi',
        description: 'Bach, Mozart ve Beethoven\'dan rahatlatıcı eserler',
        metadata: {
            genre: 'Klasik',
            duration: '30-60 dk',
            difficulty: 'Kolay',
            tags: ['sakinleştirici', 'klasik', 'rahatlatıcı']
        }
    },
    {
        mood: 'negatif',
        category: 'Kişisel',
        type: 'aktivite',
        title: 'Mindfulness Meditasyonu',
        description: 'Nefes egzersizleri ve temel meditasyon teknikleri',
        metadata: {
            duration: '15-20 dk',
            difficulty: 'Orta',
            tags: ['meditasyon', 'nefes', 'mindfulness']
        }
    },
    {
        mood: 'negatif',
        category: 'İş',
        type: 'aktivite',
        title: 'Kısa Mola Teknikleri',
        description: 'İş stresini azaltmak için 5 dakikalık mola aktiviteleri',
        metadata: {
            duration: '5-10 dk',
            difficulty: 'Kolay',
            tags: ['mola', 'stres yönetimi', 'ofis']
        }
    },
    {
        mood: 'negatif',
        category: 'Sosyal',
        type: 'aktivite',
        title: 'Doğa Yürüyüşü',
        description: 'Yakın parkta veya doğada kısa bir yürüyüş',
        metadata: {
            duration: '30-60 dk',
            difficulty: 'Kolay',
            tags: ['doğa', 'yürüyüş', 'temiz hava']
        }
    },

    // Pozitif ruh hali için öneriler
    {
        mood: 'pozitif',
        category: 'Kişisel',
        type: 'hobi',
        title: 'Yaratıcı Yazı Atölyesi',
        description: 'Günlük tutma ve yaratıcı yazı egzersizleri',
        metadata: {
            duration: '30 dk',
            difficulty: 'Orta',
            tags: ['yazı', 'yaratıcılık', 'kendini ifade']
        }
    },
    {
        mood: 'pozitif',
        category: 'İş',
        type: 'aktivite',
        title: 'Yeni Proje Planlaması',
        description: 'Yaratıcı düşünme ve proje planlama egzersizleri',
        metadata: {
            duration: '45-60 dk',
            difficulty: 'Orta',
            tags: ['planlama', 'yaratıcılık', 'iş']
        }
    },
    {
        mood: 'pozitif',
        category: 'Sosyal',
        type: 'aktivite',
        title: 'Arkadaş Buluşması Planla',
        description: 'Yakın arkadaşlarla kahve veya yemek organizasyonu',
        metadata: {
            duration: '1-2 saat',
            difficulty: 'Kolay',
            tags: ['sosyal', 'arkadaşlık', 'buluşma']
        }
    },

    // Nötr ruh hali için öneriler
    {
        mood: 'nötr',
        category: 'Kişisel',
        type: 'kitap',
        title: 'Kişisel Gelişim Kitapları',
        description: 'Motivasyon ve kişisel gelişim temalı kitap önerileri',
        metadata: {
            genre: 'Kişisel Gelişim',
            difficulty: 'Orta',
            tags: ['kitap', 'gelişim', 'motivasyon']
        }
    },
    {
        mood: 'nötr',
        category: 'İş',
        type: 'hobi',
        title: 'Online Kurs Başlat',
        description: 'Kariyer gelişimi için online eğitim önerileri',
        metadata: {
            duration: 'Değişken',
            difficulty: 'Orta',
            tags: ['eğitim', 'kariyer', 'gelişim']
        }
    },
    {
        mood: 'nötr',
        category: 'Aile',
        type: 'aktivite',
        title: 'Aile Oyun Akşamı',
        description: 'Ailece oynanabilecek kutu oyunları ve aktiviteler',
        metadata: {
            duration: '1-2 saat',
            difficulty: 'Kolay',
            tags: ['aile', 'oyun', 'eğlence']
        }
    }
];

// Önerileri veritabanına ekle
async function seedRecommendations() {
    try {
        // Mevcut önerileri temizle
        await Recommendation.deleteMany({});
        console.log('Mevcut öneriler temizlendi');

        // Yeni önerileri ekle
        const insertedRecommendations = await Recommendation.insertMany(recommendations);
        console.log(`${insertedRecommendations.length} yeni öneri eklendi`);

        // Bağlantıyı kapat
        await mongoose.connection.close();
        console.log('MongoDB bağlantısı kapatıldı');
    } catch (error) {
        console.error('Öneri ekleme hatası:', error);
        await mongoose.connection.close();
    }
}

// Scripti çalıştır
seedRecommendations(); 
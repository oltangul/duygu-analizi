const mongoose = require('mongoose');
const Recommendation = require('./models/Recommendation');

mongoose.connect('mongodb://127.0.0.1:27017/duygu-analizi')
    .then(() => console.log('MongoDB bağlantısı başarılı'))
    .catch(err => console.error('MongoDB bağlantı hatası:', err));

const recommendations = [
    // Negatif Ruh Hali - Kişisel Kategori
    {
        mood: 'negatif',
        category: 'Kişisel',
        type: 'müzik',
        title: 'Sakinleştirici Klasik Müzik Listesi',
        description: 'Bach, Mozart ve Beethoven\'dan rahatlatıcı eserler',
        metadata: {
            genre: 'klasik',
            duration: '30-60 dk',
            difficulty: 'kolay',
            tags: ['sakinleştirici', 'klasik', 'rahatlatıcı']
        },
        effectiveness: 4,
        usageCount: 10,
        positiveFeeback: 8
    },
    {
        mood: 'negatif',
        category: 'Kişisel',
        type: 'aktivite',
        title: 'Nefes Egzersizleri',
        description: 'Stresi azaltmak için temel nefes teknikleri',
        metadata: {
            duration: '10-15 dk',
            difficulty: 'kolay',
            tags: ['meditasyon', 'nefes', 'rahatlama']
        },
        effectiveness: 4.5,
        usageCount: 15,
        positiveFeeback: 13
    },

    // Negatif Ruh Hali - İş Kategori
    {
        mood: 'negatif',
        category: 'İş',
        type: 'aktivite',
        title: 'Masabaşı Gevşeme Egzersizleri',
        description: 'Ofiste yapabileceğiniz kısa gevşeme hareketleri',
        metadata: {
            duration: '5-10 dk',
            difficulty: 'kolay',
            tags: ['ofis', 'egzersiz', 'stres yönetimi']
        },
        effectiveness: 4.2,
        usageCount: 20,
        positiveFeeback: 16
    },

    // Negatif Ruh Hali - Aile Kategori
    {
        mood: 'negatif',
        category: 'Aile',
        type: 'aktivite',
        title: 'Aile İçi İletişim Aktiviteleri',
        description: 'Aile bağlarını güçlendiren basit aktiviteler',
        metadata: {
            duration: '30-60 dk',
            difficulty: 'orta',
            tags: ['iletişim', 'aile', 'aktivite']
        },
        effectiveness: 4.3,
        usageCount: 12,
        positiveFeeback: 10
    },

    // Negatif Ruh Hali - Sosyal Kategori
    {
        mood: 'negatif',
        category: 'Sosyal',
        type: 'aktivite',
        title: 'Arkadaş Buluşması Planla',
        description: 'Yakın arkadaşlarınızla kahve içmek veya yürüyüş yapmak için plan yapın',
        metadata: {
            duration: '1-2 saat',
            difficulty: 'kolay',
            tags: ['sosyal', 'arkadaşlık', 'aktivite']
        },
        effectiveness: 4.4,
        usageCount: 18,
        positiveFeeback: 15
    },

    // Nötr Ruh Hali Önerileri
    {
        mood: 'nötr',
        category: 'Kişisel',
        type: 'hobi',
        title: 'Yeni Hobi Keşfi',
        description: 'İlginizi çekebilecek yeni hobiler keşfedin',
        metadata: {
            duration: 'değişken',
            difficulty: 'orta',
            tags: ['hobi', 'keşif', 'gelişim']
        },
        effectiveness: 4.1,
        usageCount: 14,
        positiveFeeback: 11
    },

    // Pozitif Ruh Hali Önerileri
    {
        mood: 'pozitif',
        category: 'Kişisel',
        type: 'aktivite',
        title: 'Yeni Hedefler Belirleme',
        description: 'Bu pozitif enerjiyi yeni hedefler belirlemek için kullanın',
        metadata: {
            duration: '30-45 dk',
            difficulty: 'orta',
            tags: ['hedef', 'planlama', 'motivasyon']
        },
        effectiveness: 4.6,
        usageCount: 22,
        positiveFeeback: 20
    }
];

const seedRecommendations = async () => {
    try {
        // Mevcut önerileri temizle
        await Recommendation.deleteMany({});
        console.log('Mevcut öneriler temizlendi');

        // Yeni önerileri ekle
        const insertedRecommendations = await Recommendation.insertMany(recommendations);
        console.log(`${insertedRecommendations.length} öneri başarıyla eklendi`);

        // Bağlantıyı kapat
        await mongoose.connection.close();
        console.log('MongoDB bağlantısı kapatıldı');

    } catch (error) {
        console.error('Öneriler eklenirken hata:', error);
        await mongoose.connection.close();
    }
};

// Seed işlemini başlat
seedRecommendations(); 
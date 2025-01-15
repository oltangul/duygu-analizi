require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('../models/Question');

const questions = [
  // Genel Kategori
  {
    text: 'Bugün genel olarak kendinizi nasıl hissediyorsunuz?',
    type: 'scale',
    options: [
      'Çok kötü hissediyorum',
      'Kötü hissediyorum',
      'Normal hissediyorum',
      'İyi hissediyorum',
      'Çok iyi hissediyorum'
    ],
    category: 'Genel',
    order: 1
  },
  {
    text: 'Lütfen bugün kendinizi nasıl hissettiğinizi ve nedenlerini detaylı olarak açıklayınız.',
    type: 'text',
    category: 'Genel',
    order: 2
  },
  // İş Kategorisi
  {
    text: 'İş/okul hayatınızda kendinizi nasıl hissediyorsunuz?',
    type: 'scale',
    options: [
      'Çok verimsiz ve başarısız',
      'Verimsiz',
      'Normal',
      'Verimli',
      'Çok verimli ve başarılı'
    ],
    category: 'İş',
    order: 3
  },
  {
    text: 'İş/okul hayatınızda sizi etkileyen olayları ve duygularınızı paylaşır mısınız?',
    type: 'text',
    category: 'İş',
    order: 4
  },
  // Aile Kategorisi
  {
    text: 'Aile ilişkilerinizde kendinizi nasıl hissediyorsunuz?',
    type: 'scale',
    options: [
      'Çok mutsuz ve gergin',
      'Mutsuz',
      'Normal',
      'Mutlu',
      'Çok mutlu ve huzurlu'
    ],
    category: 'Aile',
    order: 5
  },
  {
    text: 'Ailenizle ilgili duygularınızı ve yaşadığınız önemli olayları anlatır mısınız?',
    type: 'text',
    category: 'Aile',
    order: 6
  },
  // Sosyal Kategori
  {
    text: 'Sosyal ilişkilerinizde kendinizi nasıl hissediyorsunuz?',
    type: 'scale',
    options: [
      'Çok yalnız ve içe kapanık',
      'Yalnız',
      'Normal',
      'Sosyal',
      'Çok sosyal ve enerjik'
    ],
    category: 'Sosyal',
    order: 7
  },
  {
    text: 'Sosyal hayatınızda yaşadığınız olayları ve size hissettirdiklerini paylaşır mısınız?',
    type: 'text',
    category: 'Sosyal',
    order: 8
  },
  // Kişisel Kategori
  {
    text: 'Kişisel gelişiminiz hakkında ne düşünüyorsunuz?',
    type: 'scale',
    options: [
      'Hiç gelişim gösteremiyorum',
      'Yetersiz gelişim gösteriyorum',
      'Normal ilerliyorum',
      'İyi gelişim gösteriyorum',
      'Çok iyi gelişim gösteriyorum'
    ],
    category: 'Kişisel',
    order: 9
  },
  {
    text: 'Kişisel gelişiminizle ilgili deneyimlerinizi ve duygularınızı paylaşır mısınız?',
    type: 'text',
    category: 'Kişisel',
    order: 10
  }
];

async function seedQuestions() {
  let connection;
  try {
    connection = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/duygu-analizi');
    console.log('MongoDB bağlantısı başarılı');

    // Mevcut soruları temizle
    await Question.deleteMany({});
    console.log('Mevcut sorular temizlendi');

    // Yeni soruları ekle
    await Question.insertMany(questions);
    console.log('Yeni sorular başarıyla eklendi');

  } catch (error) {
    console.error('Seed işlemi sırasında hata:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await mongoose.connection.close();
      console.log('MongoDB bağlantısı kapatıldı');
    }
  }
  process.exit(0);
}

// Seed işlemini sadece bir kez çalıştır
seedQuestions(); 
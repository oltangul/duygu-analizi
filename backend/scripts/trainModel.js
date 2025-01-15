require('dotenv').config();
const mongoose = require('mongoose');
const modelTrainingService = require('../services/modelTrainingService');
const dataCollectionService = require('../services/dataCollectionService');

async function trainModel() {
    try {
        // MongoDB bağlantısı
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB bağlantısı başarılı');

        // Veri toplama
        console.log('Veri toplama başlıyor...');
        const labeledData = await dataCollectionService.collectAndLabelData();
        await dataCollectionService.saveDataset(labeledData);
        console.log(`${labeledData.length} adet etiketlenmiş veri toplandı`);

        // Model eğitimi
        console.log('Model eğitimi başlıyor...');
        await modelTrainingService.trainModel();
        console.log('Model eğitimi tamamlandı');

        process.exit(0);
    } catch (error) {
        console.error('Model eğitim hatası:', error);
        process.exit(1);
    }
}

trainModel(); 
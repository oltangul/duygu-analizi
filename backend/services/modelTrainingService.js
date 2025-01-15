const sentimentAnalyzer = require('./sentimentAnalyzer');
const dataCollectionService = require('./dataCollectionService');
const fs = require('fs').promises;

class ModelTrainingService {
    constructor() {
        this.trainedData = {
            vocabulary: new Set(),
            sentimentScores: {},
            categoryPatterns: {}
        };
    }

    // Kelime bazlı model eğitimi
    async trainModel() {
        try {
            console.log('Veri toplama başlıyor...');
            const labeledData = await dataCollectionService.collectAndLabelData();
            
            // Kelime dağarcığı ve duygu skorları oluştur
            for (const item of labeledData) {
                const words = sentimentAnalyzer.preprocessText(item.text);
                words.forEach(word => {
                    this.trainedData.vocabulary.add(word);
                    
                    if (!this.trainedData.sentimentScores[word]) {
                        this.trainedData.sentimentScores[word] = {
                            pozitif: 0,
                            nötr: 0,
                            negatif: 0
                        };
                    }
                    this.trainedData.sentimentScores[word][item.sentiment]++;
                });

                // Kategori bazlı örüntüleri kaydet
                if (!this.trainedData.categoryPatterns[item.category]) {
                    this.trainedData.categoryPatterns[item.category] = {
                        pozitif: new Set(),
                        nötr: new Set(),
                        negatif: new Set()
                    };
                }
                words.forEach(word => {
                    this.trainedData.categoryPatterns[item.category][item.sentiment].add(word);
                });
            }

            // Eğitilmiş veriyi kaydet
            await this.saveTrainedData();
            
            console.log('Model başarıyla eğitildi ve kaydedildi');
            console.log(`Toplam kelime sayısı: ${this.trainedData.vocabulary.size}`);
            console.log(`İşlenen veri sayısı: ${labeledData.length}`);

            return true;
        } catch (error) {
            console.error('Model eğitim hatası:', error);
            throw error;
        }
    }

    // Eğitilmiş veriyi kaydet
    async saveTrainedData() {
        const dataToSave = {
            vocabulary: Array.from(this.trainedData.vocabulary),
            sentimentScores: this.trainedData.sentimentScores,
            categoryPatterns: Object.fromEntries(
                Object.entries(this.trainedData.categoryPatterns).map(([category, patterns]) => [
                    category,
                    {
                        pozitif: Array.from(patterns.pozitif),
                        nötr: Array.from(patterns.nötr),
                        negatif: Array.from(patterns.negatif)
                    }
                ])
            )
        };

        await fs.mkdir('./models', { recursive: true });
        await fs.writeFile(
            './models/trained_sentiment_data.json',
            JSON.stringify(dataToSave, null, 2)
        );
    }
}

module.exports = new ModelTrainingService(); 
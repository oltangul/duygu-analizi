const tf = require('@tensorflow/tfjs-node');
const textPreprocessor = require('./textPreprocessor');
const SurveyResponse = require('../models/SurveyResponse');

class SentimentTrainer {
    constructor() {
        this.model = null;
        this.vocabularySize = 0;
        this.embeddingDim = 100;
    }

    // Model mimarisini oluşturma
    createModel() {
        this.model = tf.sequential();

        // Embedding katmanı
        this.model.add(tf.layers.embedding({
            inputDim: this.vocabularySize,
            outputDim: this.embeddingDim,
            inputLength: textPreprocessor.maxSequenceLength
        }));

        // LSTM katmanı
        this.model.add(tf.layers.lstm({
            units: 64,
            returnSequences: false
        }));

        // Dropout katmanı
        this.model.add(tf.layers.dropout({ rate: 0.5 }));

        // Dense katmanlar
        this.model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
        this.model.add(tf.layers.dropout({ rate: 0.3 }));
        this.model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));

        // Model derleme
        this.model.compile({
            optimizer: 'adam',
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy']
        });

        return this.model;
    }

    // Eğitim verisi hazırlama
    async prepareTrainingData() {
        // MongoDB'den text tipindeki cevapları çek
        const responses = await SurveyResponse.find({
            'answers.type': 'text'
        }).populate('answers.questionId');

        const texts = [];
        const labels = [];

        responses.forEach(response => {
            response.answers
                .filter(answer => answer.type === 'text')
                .forEach(answer => {
                    texts.push(answer.textAnswer);
                    
                    // Label'ı belirle (aynı kategorideki scale sorusunun puanına göre)
                    const scaleAnswer = response.answers.find(a => 
                        a.type === 'scale' && a.category === answer.category
                    );
                    
                    let sentiment;
                    if (scaleAnswer.score >= 4) sentiment = 'pozitif';
                    else if (scaleAnswer.score <= 2) sentiment = 'negatif';
                    else sentiment = 'nötr';
                    
                    labels.push(sentiment);
                });
        });

        // Vocabulary oluştur
        this.vocabularySize = textPreprocessor.buildVocabulary(texts).size;

        // Metin ve etiketleri sayısal formata çevir
        const sequences = textPreprocessor.textsToSequences(texts);
        const encodedLabels = textPreprocessor.encodeLabels(labels);

        return {
            sequences: tf.tensor2d(sequences),
            labels: tf.tensor2d(encodedLabels)
        };
    }

    // Model eğitimi
    async trainModel() {
        try {
            // Model oluştur
            this.createModel();

            // Eğitim verisi hazırla
            const { sequences, labels } = await this.prepareTrainingData();

            // Eğitim parametreleri
            const batchSize = 32;
            const epochs = 10;
            const validationSplit = 0.2;

            // Eğitim
            await this.model.fit(sequences, labels, {
                batchSize,
                epochs,
                validationSplit,
                callbacks: {
                    onEpochEnd: (epoch, logs) => {
                        console.log(`Epoch ${epoch + 1}: loss = ${logs.loss}, accuracy = ${logs.acc}`);
                    }
                }
            });

            // Modeli kaydet
            await this.model.save('file://./models/sentiment_model');
            
            // Tensörleri temizle
            sequences.dispose();
            labels.dispose();

            return true;
        } catch (error) {
            console.error('Model eğitim hatası:', error);
            throw error;
        }
    }

    // Tahmin yapma
    async predict(text) {
        try {
            if (!this.model) {
                throw new Error('Model henüz eğitilmedi');
            }

            // Metni sayısal diziye çevir
            const sequence = textPreprocessor.textToSequence(text);
            
            // Tensor oluştur
            const input = tf.tensor2d([sequence]);
            
            // Tahmin yap
            const prediction = await this.model.predict(input);
            const scores = await prediction.data();
            
            // Tensörleri temizle
            input.dispose();
            prediction.dispose();

            // En yüksek skoru bul
            const maxScore = Math.max(...scores);
            const sentimentIndex = scores.indexOf(maxScore);
            const sentiments = ['negatif', 'nötr', 'pozitif'];

            return {
                sentiment: sentiments[sentimentIndex],
                confidence: maxScore
            };
        } catch (error) {
            console.error('Tahmin hatası:', error);
            throw error;
        }
    }
}

module.exports = new SentimentTrainer(); 
const tf = require('@tensorflow/tfjs-node');

class TextPreprocessor {
    constructor() {
        this.vocabulary = new Map();
        this.maxSequenceLength = 50;
    }

    // Metni temizleme ve tokenize etme
    tokenize(text) {
        return text.toLowerCase()
            .replace(/[.,!?\\-]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .split(' ');
    }

    // Kelime dağarcığı oluşturma
    buildVocabulary(texts) {
        const words = new Set();
        texts.forEach(text => {
            const tokens = this.tokenize(text);
            tokens.forEach(word => words.add(word));
        });

        // Özel tokenlar ekleme
        words.add('<PAD>'); // Padding için
        words.add('<UNK>'); // Bilinmeyen kelimeler için

        // Vocabulary map'i oluşturma
        Array.from(words).forEach((word, index) => {
            this.vocabulary.set(word, index);
        });

        return this.vocabulary;
    }

    // Metni sayısal diziye çevirme
    textToSequence(text) {
        const tokens = this.tokenize(text);
        const sequence = tokens.map(token => 
            this.vocabulary.get(token) || this.vocabulary.get('<UNK>')
        );

        // Padding işlemi
        if (sequence.length > this.maxSequenceLength) {
            return sequence.slice(0, this.maxSequenceLength);
        }

        while (sequence.length < this.maxSequenceLength) {
            sequence.push(this.vocabulary.get('<PAD>'));
        }

        return sequence;
    }

    // Birden fazla metni işleme
    textsToSequences(texts) {
        return texts.map(text => this.textToSequence(text));
    }

    // One-hot encoding
    encodeLabels(labels) {
        const uniqueLabels = ['negatif', 'nötr', 'pozitif'];
        return labels.map(label => {
            const encoding = [0, 0, 0];
            encoding[uniqueLabels.indexOf(label)] = 1;
            return encoding;
        });
    }
}

module.exports = new TextPreprocessor(); 
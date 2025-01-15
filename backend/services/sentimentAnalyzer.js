class SentimentAnalyzer {
    constructor() {
        this.positiveWords = [
            'mutlu', 'huzurlu', 'neşeli', 'güzel', 'harika', 'muhteşem', 'başarılı',
            'pozitif', 'umutlu', 'enerjik', 'keyifli', 'memnun', 'tatmin', 'rahat',
            'güçlü', 'motivasyonlu', 'hevesli', 'coşkulu', 'sevgi', 'sevinç'
        ];

        this.negativeWords = [
            'üzgün', 'mutsuz', 'kötü', 'kızgın', 'sinirli', 'endişeli', 'stresli',
            'yorgun', 'başarısız', 'umutsuz', 'kaygılı', 'rahatsız', 'huzursuz',
            'yalnız', 'çaresiz', 'tükenmiş', 'bitkin', 'depresif', 'öfkeli', 'nefret'
        ];

        this.neutralWords = [
            'normal', 'orta', 'idare', 'fena değil', 'şöyle böyle', 'eh işte',
            'olağan', 'sıradan', 'standart', 'alışılmış', 'bilindik'
        ];

        this.intensifiers = [
            'çok', 'aşırı', 'oldukça', 'fazla', 'son derece', 'epey',
            'bayağı', 'hayli', 'gayet', 'pek'
        ];
    }

    analyzeText(text) {
        if (!text || typeof text !== 'string') {
            return {
                sentiment: 'nötr',
                confidence: 0.5,
                score: 0
            };
        }

        const words = text.toLowerCase().split(/\s+/);
        let score = 0;
        let confidence = 0.5;
        let positiveCount = 0;
        let negativeCount = 0;
        let intensifierCount = 0;

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const nextWord = words[i + 1];

            if (this.intensifiers.includes(word)) {
                intensifierCount++;
                continue;
            }

            if (this.positiveWords.includes(word)) {
                score += intensifierCount > 0 ? 2 : 1;
                positiveCount++;
            } else if (this.negativeWords.includes(word)) {
                score -= intensifierCount > 0 ? 2 : 1;
                negativeCount++;
            }

            intensifierCount = 0;
        }

        const totalSentimentWords = positiveCount + negativeCount;
        if (totalSentimentWords > 0) {
            confidence = Math.min(0.9, 0.5 + (totalSentimentWords / words.length) * 0.5);
        }

        // Negatif skorları güçlendir
        if (score < 0) {
            score *= 1.5;
        }

        let normalizedScore = score / Math.max(1, words.length * 0.5);
        normalizedScore = Math.max(-1, Math.min(1, normalizedScore));

        let sentiment = 'nötr';
        if (normalizedScore > 0.3) sentiment = 'pozitif';
        else if (normalizedScore < -0.2) sentiment = 'negatif';

        return {
            sentiment,
            confidence,
            score: normalizedScore
        };
    }

    analyzeMultipleTexts(texts = [], scaleScores = [], category = '') {
        // Metin analizi
        const textAnalyses = texts.map(text => this.analyzeText(text));
        const validTextAnalyses = textAnalyses.filter(analysis => analysis.confidence > 0.5);
        
        let textScore = 0;
        let textConfidence = 0;
        
        if (validTextAnalyses.length > 0) {
            textScore = validTextAnalyses.reduce((sum, analysis) => sum + analysis.score, 0) / validTextAnalyses.length;
            textConfidence = validTextAnalyses.reduce((sum, analysis) => sum + analysis.confidence, 0) / validTextAnalyses.length;
        }

        // Ölçek puanları analizi
        let scaleScore = 0;
        if (scaleScores.length > 0) {
            // Ölçek puanlarını -1 ile 1 arasına normalize et
            const normalizedScores = scaleScores.map(score => (score - 3) / 2);
            scaleScore = normalizedScores.reduce((sum, score) => sum + score, 0) / scaleScores.length;
            
            // Negatif ölçek puanlarını güçlendir
            if (scaleScore < 0) {
                scaleScore *= 1.5;
            }
        }

        // Ağırlıklı ortalama hesapla
        const textWeight = 0.3;
        const scaleWeight = 0.7;
        
        let weightedScore = 0;
        let finalConfidence = 0;

        if (texts.length > 0 && scaleScores.length > 0) {
            weightedScore = (textScore * textWeight) + (scaleScore * scaleWeight);
            finalConfidence = (textConfidence * textWeight) + (0.9 * scaleWeight);
        } else if (texts.length > 0) {
            weightedScore = textScore;
            finalConfidence = textConfidence;
        } else if (scaleScores.length > 0) {
            weightedScore = scaleScore;
            finalConfidence = 0.9;
        }

        // Eğer ölçek puanları çok düşükse, sonucu negatife zorla
        const averageScaleScore = scaleScores.length > 0 ? 
            scaleScores.reduce((sum, score) => sum + score, 0) / scaleScores.length : 0;
        
        if (averageScaleScore <= 2) {
            weightedScore = Math.min(weightedScore, -0.3);
        }

        let sentiment = 'nötr';
        if (weightedScore > 0.3) sentiment = 'pozitif';
        else if (weightedScore < -0.2) sentiment = 'negatif';

        return {
            overall: {
                sentiment,
                confidence: finalConfidence,
                weightedScore
            },
            textAnalysis: {
                score: textScore,
                confidence: textConfidence,
                details: textAnalyses
            },
            scaleAnalysis: {
                score: scaleScore,
                averageScore: averageScaleScore
            }
        };
    }
}

module.exports = new SentimentAnalyzer(); 
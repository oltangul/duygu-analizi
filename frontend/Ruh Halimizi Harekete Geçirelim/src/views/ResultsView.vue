<template>
  <div class="results">
    <div class="container">
      <h1 class="title">Analiz Sonuçlarınız</h1>
      
      <div class="mood-section">
        <h2 class="mood-title">Ruh Haliniz</h2>
        <div class="mood-card" :class="moodClass">
          <h3>{{ getMoodText(surveyResult?.analysis?.overallMood) }}</h3>
          <p>{{ getMoodDescription(surveyResult?.analysis?.overallMood) }}</p>
        </div>
      </div>

      <div class="recommendations-section">
        <h2 class="section-title">Size Özel Öneriler</h2>
        
        <div class="recommendations-grid">
          <div v-for="(category, index) in categories" 
               :key="index" 
               class="category-section">
            <h3 class="category-title">{{ getCategoryTitle(category) }}</h3>
            <div v-if="recommendations[category]" class="recommendation-list">
              <div v-for="(rec, recIndex) in recommendations[category]" 
                   :key="recIndex" 
                   class="recommendation-card">
                <div class="rec-header">
                  <h4 class="rec-title">{{ rec.title }}</h4>
                  <span class="rec-type">{{ rec.type }}</span>
                </div>
                <p class="rec-description">{{ rec.description }}</p>
                <div class="rec-metadata">
                  <span v-if="rec.metadata?.duration">Süre: {{ rec.metadata.duration }}</span>
                  <span v-if="rec.metadata?.difficulty">Zorluk: {{ rec.metadata.difficulty }}</span>
                </div>
                <div class="rec-tags" v-if="rec.metadata?.tags">
                  <span v-for="(tag, tagIndex) in rec.metadata.tags" 
                        :key="tagIndex" 
                        class="tag">{{ tag }}</span>
                </div>
                <div class="rec-feedback">
                  <button @click="submitFeedback(rec._id, true)" 
                          class="feedback-btn positive">
                    👍 Faydalı
                  </button>
                  <button @click="submitFeedback(rec._id, false)" 
                          class="feedback-btn negative">
                    👎 Faydalı Değil
                  </button>
                </div>
              </div>
            </div>
            <div v-else class="loading-recommendations">
              Öneriler yükleniyor...
            </div>
          </div>
        </div>
      </div>

      <div class="actions">
        <button class="action-button" @click="retakeSurvey">
          Yeniden Test Et
        </button>
        <button class="action-button secondary" @click="shareSurvey">
          Sonuçları Paylaş
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const categories = ['Kişisel', 'İş', 'Aile', 'Sosyal'] as const
type Category = typeof categories[number]

interface Recommendation {
  _id: string;
  title: string;
  type: string;
  description: string;
  metadata?: {
    duration?: string;
    difficulty?: string;
    tags?: string[];
  };
}

interface RecommendationsState {
  [key: string]: Recommendation[];
}

const recommendations = ref<RecommendationsState>({})

interface SurveyResult {
  analysis: {
    overallMood: 'pozitif' | 'negatif' | 'nötr';
    moodScore: number;
  };
}

const surveyResult = ref<SurveyResult | null>(null)
const loading = ref(true)

const moodClass = computed(() => {
  return {
    'mood-positive': surveyResult.value?.analysis?.overallMood === 'pozitif',
    'mood-negative': surveyResult.value?.analysis?.overallMood === 'negatif',
    'mood-neutral': surveyResult.value?.analysis?.overallMood === 'nötr'
  }
})

const getCategoryTitle = (category: Category): string => {
  const titles: Record<Category, string> = {
    'Kişisel': 'Kişisel Gelişim',
    'İş': 'İş Hayatı',
    'Aile': 'Aile İlişkileri',
    'Sosyal': 'Sosyal Yaşam'
  }
  return titles[category]
}

const getMoodText = (mood: 'pozitif' | 'negatif' | 'nötr' | undefined) => {
  const moodTexts = {
    'pozitif': 'Olumlu ve İyimser',
    'negatif': 'Olumsuz ve Kaygılı',
    'nötr': 'Dengeli ve Sakin'
  }
  return moodTexts[mood || 'nötr']
}

const getMoodDescription = (mood: 'pozitif' | 'negatif' | 'nötr' | undefined) => {
  const descriptions = {
    'pozitif': 'Şu anda oldukça pozitif ve umut dolu bir ruh halindesiniz. Bu enerjiyi korumak için size özel önerilerimizi inceleyin.',
    'negatif': 'Şu anda olumsuz duygular ve kaygılar yaşıyorsunuz. Size destek olabilecek önerilerimizi inceleyin.',
    'nötr': 'Şu anda dengeli ve sakin bir ruh halindesiniz. Bu dengeyi korumak için önerilerimize göz atın.'
  }
  return descriptions[mood || 'nötr']
}

const loadRecommendations = async (mood: string, category: string) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/recommendations`, {
      params: { mood, category },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.data.success) {
      recommendations.value[category] = response.data.data
    }
  } catch (error) {
    console.error(`${category} önerileri yüklenirken hata:`, error)
  }
}

const submitFeedback = async (recommendationId: string, isEffective: boolean) => {
  try {
    await axios.post('http://localhost:3001/api/recommendations/feedback', {
      recommendationId,
      isEffective
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    alert(isEffective ? 'Geri bildiriminiz için teşekkürler!' : 'Geri bildiriminiz için teşekkürler, daha iyi öneriler sunmaya çalışacağız.')
  } catch (error) {
    console.error('Geri bildirim gönderilirken hata:', error)
    alert('Geri bildirim gönderilirken bir hata oluştu.')
  }
}

const loadResults = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/survey-responses/my-latest', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    surveyResult.value = response.data
    
    // Tüm kategoriler için önerileri yükle
    if (response.data?.analysis?.overallMood) {
      for (const category of categories) {
        await loadRecommendations(response.data.analysis.overallMood, category)
      }
    }
    
    loading.value = false
  } catch (error) {
    console.error('Sonuçlar yüklenirken hata:', error)
    loading.value = false
  }
}

const retakeSurvey = () => {
  router.push('/survey')
}

const shareSurvey = () => {
  alert('Paylaşım özelliği yakında eklenecek!')
}

onMounted(loadResults)
</script>

<style scoped>
.results {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  color: #2d3748;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.mood-section {
  margin-bottom: 3rem;
}

.mood-title {
  color: #4a5568;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.mood-card {
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
}

.mood-positive {
  background-color: #e6fffa;
  border: 2px solid #38b2ac;
}

.mood-negative {
  background-color: #fff5f5;
  border: 2px solid #f56565;
}

.mood-neutral {
  background-color: #f7fafc;
  border: 2px solid #a0aec0;
}

.mood-card h3 {
  color: #4c51bf;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.mood-card p {
  color: #4a5568;
  line-height: 1.6;
}

.section-title {
  color: #4a5568;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.recommendation-card {
  background: #f7fafc;
  border-radius: 0.5rem;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
}

.rec-type {
  color: #4c51bf;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.rec-content {
  color: #4a5568;
  line-height: 1.5;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.action-button {
  padding: 0.8rem 1.6rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-button:not(.secondary) {
  background: #4c51bf;
  color: white;
}

.action-button.secondary {
  background: #e2e8f0;
  color: #4a5568;
}

.action-button:hover {
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .container {
    padding: 1rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .recommendations-grid {
    grid-template-columns: 1fr;
  }

  .actions {
    flex-direction: column;
  }

  .action-button {
    width: 100%;
  }
}

.category-section {
  margin-bottom: 2rem;
}

.category-title {
  color: #2d3748;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.recommendation-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.recommendation-card {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.rec-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.rec-title {
  font-size: 1.1rem;
  color: #2d3748;
  margin: 0;
}

.rec-type {
  font-size: 0.9rem;
  color: #718096;
  background: #f7fafc;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
}

.rec-description {
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.rec-metadata {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #718096;
}

.rec-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: #edf2f7;
  color: #4a5568;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
}

.rec-feedback {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.feedback-btn {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.feedback-btn.positive {
  background: #c6f6d5;
  color: #2f855a;
}

.feedback-btn.negative {
  background: #fed7d7;
  color: #c53030;
}

.feedback-btn:hover {
  opacity: 0.9;
}

.loading-recommendations {
  text-align: center;
  color: #718096;
  padding: 2rem;
  background: #f7fafc;
  border-radius: 0.5rem;
}
</style> 
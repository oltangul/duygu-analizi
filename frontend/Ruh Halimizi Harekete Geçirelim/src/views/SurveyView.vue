<template>
  <div class="survey">
    <div class="container">
      <div v-if="isLoading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Sorular yükleniyor...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <p class="error-message">{{ error }}</p>
        <button class="retry-button" @click="fetchQuestions">Tekrar Dene</button>
      </div>

      <template v-else>
        <div class="progress-bar">
          <div class="progress" :style="{ width: progress + '%' }"></div>
        </div>

        <div class="survey-content" v-if="!isCompleted">
          <div class="question-header">
            <h2 class="question-number">Soru {{ currentQuestionIndex + 1 }}/{{ questions.length }}</h2>
          </div>

          <div class="question-card">
            <h1 class="question">{{ currentQuestion.text }}</h1>

            <!-- Scale tipi sorular için seçenekler -->
            <div v-if="currentQuestion.type === 'scale'" class="options">
              <button
                v-for="(option, index) in scaleOptions"
                :key="index"
                class="option-button"
                :class="{ selected: selectedOption === index }"
                @click="selectOption(index)"
              >
                {{ option }}
              </button>
            </div>

            <!-- Text tipi sorular için textarea -->
            <div v-if="currentQuestion.type === 'text'" class="text-input">
              <textarea
                v-model="textAnswer"
                class="text-answer"
                rows="4"
                placeholder="Lütfen düşüncelerinizi buraya yazın..."
              ></textarea>
            </div>
          </div>

          <div class="navigation">
            <button 
              class="nav-button" 
              @click="previousQuestion"
              :disabled="currentQuestionIndex === 0"
            >
              Önceki Soru
            </button>
            <button 
              class="nav-button primary" 
              @click="nextQuestion"
              :disabled="!canProceed"
            >
              {{ isLastQuestion ? 'Tamamla' : 'Sonraki Soru' }}
            </button>
          </div>
        </div>

        <div class="completion-message" v-else>
          <h2>Anket Tamamlandı!</h2>
          <p>Cevaplarınız analiz ediliyor...</p>
          <div class="loading-spinner"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Question {
  _id: string;
  text: string;
  type: 'scale' | 'text';
  options?: string[];
  category: string;
  order: number;
}

const questions = ref<Question[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const textAnswer = ref('')
const textAnswers = ref<{ [key: string]: string }>({})
const currentQuestionIndex = ref(0)
const selectedOption = ref<number | null>(null)
const answers = ref<number[]>([])
const isCompleted = ref(false)

const fetchQuestions = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const response = await fetch('http://localhost:3001/api/questions', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        router.push('/login');
        return;
      }
      throw new Error('Sorular getirilemedi');
    }

    const data = await response.json();
    console.log('Gelen sorular:', data);
    questions.value = data.sort((a: Question, b: Question) => a.order - b.order);
    console.log('Sıralanmış sorular:', questions.value);
    isLoading.value = false;
  } catch (err) {
    console.error('Soru getirme hatası:', err)
    error.value = err instanceof Error ? err.message : 'Sorular yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.'
    isLoading.value = false
  }
};

onMounted(() => {
  fetchQuestions()
})

const currentQuestion = computed(() => {
  const question = questions.value[currentQuestionIndex.value] || {}
  console.log('Şu anki soru:', question)
  return question
})

const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1)
const progress = computed(() => (currentQuestionIndex.value / questions.value.length) * 100)

const canProceed = computed(() => {
  if (!currentQuestion.value) return false
  if (currentQuestion.value.type === 'scale') return selectedOption.value !== null
  return textAnswer.value.trim().length > 0
})

const selectOption = (index: number) => {
  selectedOption.value = index
}

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
    if (currentQuestion.value.type === 'scale') {
      selectedOption.value = answers.value[currentQuestionIndex.value]
    } else {
      textAnswer.value = textAnswers.value[currentQuestion.value._id] || ''
    }
  }
}

const nextQuestion = () => {
  if (currentQuestion.value.type === 'scale' && selectedOption.value !== null) {
    answers.value[currentQuestionIndex.value] = selectedOption.value
  } else if (currentQuestion.value.type === 'text' && textAnswer.value.trim()) {
    textAnswers.value[currentQuestion.value._id] = textAnswer.value
  }

  if (isLastQuestion.value) {
    completeSurvey()
  } else {
    currentQuestionIndex.value++
    if (currentQuestion.value.type === 'scale') {
      selectedOption.value = answers.value[currentQuestionIndex.value] ?? null
    } else {
      textAnswer.value = textAnswers.value[currentQuestion.value._id] || ''
    }
  }
}



const completeSurvey = async () => {
  try {
    isCompleted.value = true
    
    const surveyAnswers = questions.value.map((question, index) => {
      const baseAnswer = {
        questionId: question._id,
        type: question.type,
        category: question.category
      }

      if (question.type === 'scale') {
        return {
          ...baseAnswer,
          score: 5 - (answers.value[index] || 0)
        }
      }

      return {
        ...baseAnswer,
        textAnswer: textAnswers.value[question._id] || ''
      }
    })

    const surveyResponse = {
      answers: surveyAnswers
    }

    console.log('Gönderilen veri:', surveyResponse)

    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Oturum bulunamadı')
    }

    const response = await fetch('http://localhost:3001/api/survey-responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(surveyResponse)
    })

    if (!response.ok) {
      throw new Error('Anket yanıtları kaydedilirken bir hata oluştu')
    }

    const result = await response.json()
    console.log('Başarılı yanıt:', result)
    router.push('/results')
  } catch (err) {
    console.error('Anket gönderme hatası:', err)
    isCompleted.value = false
    error.value = err instanceof Error ? err.message : 'Anket yanıtları kaydedilirken bir hata oluştu'
  }
}



const getMoodFromScore = (score: number): string => {
  if (score >= 4.5) return 'Çok İyi'
  if (score >= 3.5) return 'İyi'
  if (score >= 2.5) return 'Normal'
  if (score >= 1.5) return 'Kötü'
  return 'Çok Kötü'
}

const scaleOptions = [
  'Çok İyi Hissediyorum',
  'İyi Hissediyorum',
  'Normal Hissediyorum',
  'Kötü Hissediyorum',
  'Çok Kötü Hissediyorum'
]
</script>

<style scoped>
.survey {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.question-number {
  font-size: 1.2rem;
  color: #4a5568;
  margin: 0;
}

.category-badge {
  background: #4c51bf;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
}

.progress-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  margin-bottom: 2rem;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #4c51bf;
  transition: width 0.3s ease;
}

.question-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.question {
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 2rem;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
}

.option-button {
  padding: 1.2rem;
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  background: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.option-button::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: transparent;
  transition: all 0.3s ease;
}

.option-button:hover {
  border-color: #4c51bf;
  background: #f7fafc;
  transform: translateX(5px);
}

.option-button.selected {
  border-color: #4c51bf;
  background: #ebf4ff;
  color: #4c51bf;
  font-weight: 600;
}

.option-button.selected::before {
  background: #4c51bf;
}

.text-input {
  margin: 2rem 0;
}

.text-answer {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
  transition: border-color 0.3s ease;
}

.text-answer:focus {
  outline: none;
  border-color: #4c51bf;
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.nav-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #e2e8f0;
  color: #4a5568;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-button.primary {
  background: #4c51bf;
  color: white;
}

.nav-button.primary:hover:not(:disabled) {
  background: #434190;
}

.loading-state, .error-state {
  text-align: center;
  padding: 2rem;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4c51bf;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.completion-message {
  text-align: center;
  padding: 2rem;
}

.completion-message h2 {
  color: #2d3748;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.completion-message p {
  color: #4a5568;
  margin-bottom: 2rem;
}

@media (max-width: 640px) {
  .container {
    padding: 1rem;
  }

  .question {
    font-size: 1.3rem;
  }

  .nav-button {
    padding: 0.6rem 1.2rem;
  }
}
</style> 
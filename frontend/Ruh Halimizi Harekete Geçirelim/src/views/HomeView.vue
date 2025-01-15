<template>
  <div class="home">
    <!-- Hero Bölümü -->
    <section class="hero">
      <div class="hero-content animate__animated animate__fadeIn">
        <h1 class="hero-title animate__animated animate__fadeInUp">
          Duygularınızı Keşfedin
        </h1>
        <p class="hero-description animate__animated animate__fadeInUp animate__delay-1s">
          Yapay zeka destekli duygu analizi ile kendinizi daha iyi tanıyın ve size özel öneriler alın.
        </p>
        <button 
          class="hero-button animate__animated animate__fadeInUp animate__delay-2s"
          @click="goToLogin"
        >
          Hemen Başla
        </button>
      </div>
      <div class="hero-overlay"></div>
    </section>

    <!-- Özellikler Bölümü -->
    <section class="features">
      <div class="container">
        <h2 class="section-title animate__animated animate__fadeInUp">Neler Sunuyoruz?</h2>
        
        <div class="features-grid">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="feature-card animate__animated animate__fadeInUp"
            :style="{ 'animation-delay': `${0.2 * index}s` }"
          >
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Nasıl Çalışır Bölümü -->
    <section class="how-it-works">
      <div class="container">
        <h2 class="section-title animate__animated animate__fadeInUp">Nasıl Çalışır?</h2>
        
        <div class="steps-grid">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="step-card animate__animated animate__fadeInUp"
            :style="{ 'animation-delay': `${0.2 * index}s` }"
          >
            <div class="feature-icon">{{ step.icon }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Bölümü -->
    <section class="cta">
      <div class="container">
        <div class="cta-content animate__animated animate__fadeIn">
          <h2>Duygusal Yolculuğunuza Başlayın</h2>
          <p>Hemen ücretsiz hesap oluşturun ve duygu analizine başlayın.</p>
          <button @click="goToRegister" class="cta-button">
            Ücretsiz Hesap Oluştur
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import 'animate.css'

const router = useRouter()

const features = [
  {
    icon: '🎯',
    title: 'Duygu Analizi',
    description: 'Yapay zeka ile anlık duygu durumunuzu analiz edin'
  },
  {
    icon: '💡',
    title: 'Kişisel Öneriler',
    description: 'Size özel aktivite, müzik ve kitap önerileri alın'
  },
  {
    icon: '📊',
    title: 'Gelişim Takibi',
    description: 'Duygusal değişimlerinizi grafiklerle takip edin'
  },
  {
    icon: '🔒',
    title: 'Güvenli Analiz',
    description: 'Verileriniz güvenle saklanır ve korunur'
  }
]

const steps = [
  {
    icon: '👤',
    title: 'Hesap Oluşturun',
    description: 'Hızlı ve kolay bir şekilde ücretsiz hesabınızı oluşturun.'
  },
  {
    icon: '🤖',
    title: 'Analizi Tamamlayın',
    description: 'Duygusal durumunuzu analiz etmek için soruları yanıtlayın.'
  },
  {
    icon: '📊',
    title: 'Sonuçları Görün',
    description: 'Kişiselleştirilmiş duygu analizi raporunuzu inceleyin.'
  }
]

const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

/* Hero Bölümü */
.hero {
  position: relative;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--text-white);
  background-image: url('https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?q=80&w=2070');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: var(--spacing-xl);
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  color: rgba(239, 200, 17, 1);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-description {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-xl);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.hero-button {
  padding: 1rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-white);
  background: var(--primary-color);
  border: none;
  border-radius: var(--radius-full);
  transition: var(--transition-normal);
  box-shadow: var(--shadow-lg);
}

.hero-button:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

/* Özellikler Bölümü */
.features {
  padding: calc(var(--spacing-2xl) * 3) 0;
  background: var(--bg-white);
}

.section-title {
  text-align: center;
  margin-bottom: var(--spacing-2xl); 
  color: var(--text-primary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
}

.feature-card {
  padding: var(--spacing-xl);
  text-align: center;
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: var(--transition-normal);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
  color: var(--accent-color);
}

/* Nasıl Çalışır Bölümü */
.how-it-works {
  padding: calc(var(--spacing-2xl) * 3) 0;
  background: var(--bg-primary);
  color: var(--text-white);
}

.how-it-works .section-title {
  color: var(--text-white);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

.step-card {
  padding: var(--spacing-xl);
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  transition: var(--transition-normal);
}

.step-card h3 {
  color: var(--accent-color);
  font-size: 1.2rem;
  margin-bottom: var(--spacing-md);
}

.step-card p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
  color: var(--accent-color);
}

/* CTA Bölümü */
.cta {
  padding: calc(var(--spacing-2xl) * 3) 0;
  background: var(--bg-white);
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-content h2 {
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
  font-size: 2.5rem;
}

.cta-content p {
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
  font-size: 1.2rem;
}

.cta-button {
  margin-top: var(--spacing-lg);
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-white);
  background: var(--primary-color);
  border: none;
  border-radius: var(--radius-full);
  transition: var(--transition-normal);
}

.cta-button:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Responsive Tasarım */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.2rem;
  }

  .features-grid,
  .steps-grid {
    grid-template-columns: 1fr;
  }

  .feature-card,
  .step-card {
    padding: var(--spacing-lg);
  }
}
</style>

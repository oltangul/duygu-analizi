<template>
  <div class="about">
    <!-- Üst Banner -->
    <section class="banner">
      <div class="banner-overlay"></div>
      <div class="container">
        <h1 class="banner-title animate__animated animate__fadeIn">Hakkımızda</h1>
        <p class="banner-description animate__animated animate__fadeInUp animate__delay-1s">
          Duygu analizi ve yapay zeka teknolojileri ile size özel çözümler sunuyoruz
        </p>
      </div>
    </section>

    <!-- Misyon & Vizyon -->
    <section class="mission-vision">
      <div class="container">
        <div class="grid-2">
          <div class="card animate__animated animate__fadeInLeft">
            <div class="card-icon">🎯</div>
            <h2>Misyonumuz</h2>
            <p>
              İnsanların duygusal durumlarını daha iyi anlamalarına ve yönetmelerine yardımcı olmak için
              yapay zeka teknolojisini kullanarak kişiselleştirilmiş çözümler sunmak.
            </p>
          </div>
          <div class="card animate__animated animate__fadeInRight">
            <div class="card-icon">👁️</div>
            <h2>Vizyonumuz</h2>
            <p>
              Duygusal zeka ve yapay zeka teknolojilerini birleştirerek, insanların ruh sağlığı ve
              mutluluğuna katkıda bulunan öncü platform olmak.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Neden Biz? -->
    <section class="why-us">
      <div class="container">
        <h2 class="section-title animate__animated animate__fadeInUp">Neden Biz?</h2>
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

    <!-- Ekip -->
    <section class="team">
      <div class="container">
        <h2 class="section-title animate__animated animate__fadeInUp">Ekibimiz</h2>
        <div class="team-grid">
          <div 
            v-for="(member, index) in team" 
            :key="index"
            class="team-card animate__animated animate__fadeInUp"
            :style="{ 'animation-delay': `${0.2 * index}s` }"
          >
            <img :src="member.image" :alt="member.name" class="team-image">
            <h3>{{ member.name }}</h3>
            <p class="team-role">{{ member.role }}</p>
            <p class="team-description">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- İstatistikler -->
    <section class="stats">
      <div class="container">
        <h2 class="section-title animate__animated animate__fadeInUp">Rakamlarla Biz</h2>
        <div class="stats-grid">
          <div 
            v-for="(stat, index) in stats" 
            :key="index"
            class="stat-card animate__animated animate__fadeInUp"
            :style="{ 'animation-delay': `${0.2 * index}s` }"
          >
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import 'animate.css'

const features = [
  {
    icon: '🤖',
    title: 'Yapay Zeka',
    description: 'En son teknoloji yapay zeka modelleri'
  },
  {
    icon: '🔒',
    title: 'Güvenlik',
    description: 'Verileriniz güvenle saklanır'
  },
  {
    icon: '⚡',
    title: 'Hızlı Analiz',
    description: 'Saniyeler içinde sonuç alın'
  },
  {
    icon: '👥',
    title: 'Kişiselleştirme',
    description: 'Size özel öneriler'
  }
]

const team = [
  {
    name: 'Ahmet Yılmaz',
    role: 'Kurucu & CEO',
    description: 'Yapay zeka ve veri bilimi uzmanı',
    image: `https://ui-avatars.com/api/?name=Ahmet+Yılmaz&background=random`
  },
  {
    name: 'Ayşe Demir',
    role: 'Baş Geliştirici',
    description: 'Full-stack yazılım geliştirici',
    image: `https://ui-avatars.com/api/?name=Ayşe+Demir&background=random`
  },
  {
    name: 'Mehmet Kaya',
    role: 'Veri Bilimci',
    description: 'Makine öğrenmesi uzmanı',
    image: `https://ui-avatars.com/api/?name=Mehmet+Kaya&background=random`
  }
]

const stats = [
  {
    number: '10K+',
    label: 'Kullanıcı'
  },
  {
    number: '50K+',
    label: 'Analiz'
  },
  {
    number: '95%',
    label: 'Memnuniyet'
  },
  {
    number: '24/7',
    label: 'Destek'
  }
]
</script>

<style scoped>
.about {
  min-height: 100vh;
}

/* Banner */
.banner {
  position: relative;
  height: 60vh;
  display: flex;
  align-items: center;
  background-image: url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070');
  background-size: cover;
  background-position: center;
  color: var(--text-white);
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
}

.banner .container {
  position: relative;
  z-index: 2;
  text-align: center;
}

.banner-title {
  font-size: 3.5rem;
  color: rgba(239, 200, 17, 1);
  margin-bottom: var(--spacing-md);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.banner-description {
  font-size: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

/* Misyon & Vizyon */
.mission-vision {
  padding: calc(var(--spacing-2xl) * 3) 0;
  background: var(--bg-white);
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

.card {
  padding: var(--spacing-xl);
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: var(--transition-normal);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
}

/* Neden Biz? */
.why-us {
  padding: calc(var(--spacing-2xl) * 3) 0;
  background: var(--bg-primary);
}

.why-us .section-title {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  color: var(--text-white);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
}

.feature-card {
  padding: var(--spacing-xl);
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  transition: var(--transition-normal);
}

.feature-card h3 {
  color: var(--accent-color);
  font-size: 1.2rem;
  margin-bottom: var(--spacing-md);
}

.feature-card p {
  color: var(--text-white);
  opacity: 0.8;
  font-size: 1rem;
  line-height: 1.6;
}

.feature-card .feature-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
  color: var(--accent-color);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

/* Ekip */
.team {
  padding: calc(var(--spacing-2xl) * 3) 0;
  background: var(--bg-white);
}

.team .section-title {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  color: var(--primary-color);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

.team-card {
  padding: var(--spacing-xl);
  text-align: center;
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: var(--transition-normal);
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.team-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: var(--spacing-md);
}

.team-role {
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.team-description {
  color: var(--text-secondary);
}

/* İstatistikler */
.stats {
  padding: calc(var(--spacing-2xl) * 3) 0;
  background: var(--bg-primary);
  color: var(--text-white);
}

.stats .section-title {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  color: var(--text-white);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
}

.stat-card {
  padding: var(--spacing-xl);
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  transition: var(--transition-normal);
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  color: var(--accent-color);
}

.stat-label {
  font-size: 1.2rem;
  color: var(--text-white);
  opacity: 0.8;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .banner-title {
    font-size: 2.5rem;
  }

  .banner-description {
    font-size: 1.2rem;
  }

  .grid-2,
  .features-grid,
  .team-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .card,
  .feature-card,
  .team-card {
    padding: var(--spacing-lg);
  }
}
</style>

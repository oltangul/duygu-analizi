<template>
  <div class="contact">
    <!-- Üst Banner -->
    <section class="banner">
      <div class="banner-overlay"></div>
      <div class="container">
        <h1 class="banner-title animate__animated animate__fadeIn">İletişim</h1>
        <p class="banner-description animate__animated animate__fadeInUp animate__delay-1s">
          Sorularınız için bizimle iletişime geçin
        </p>
      </div>
    </section>

    <!-- İletişim Bilgileri ve Form -->
    <section class="contact-section">
      <div class="container">
        <div class="contact-grid">
          <!-- İletişim Bilgileri -->
          <div class="contact-info animate__animated animate__fadeInLeft">
            <h2>Bize Ulaşın</h2>
            
            <div class="info-item">
              <div class="info-icon">📍</div>
              <div class="info-content">
                <h3>Adres</h3>
                <p>Teknoloji Vadisi, No: 123<br>34000 İstanbul, Türkiye</p>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon">📞</div>
              <div class="info-content">
                <h3>Telefon</h3>
                <p>+90 (212) 555 0123</p>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon">✉️</div>
              <div class="info-content">
                <h3>E-posta</h3>
                <p>info@duyguanalizi.com</p>
              </div>
            </div>

            <div class="social-links">
              <a href="#" class="social-link">
                <i class="fab fa-facebook"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <!-- İletişim Formu -->
          <div class="contact-form animate__animated animate__fadeInRight">
            <h2>Mesaj Gönderin</h2>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="name">Ad Soyad</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="formData.name" 
                  required
                  placeholder="Adınız ve soyadınız"
                >
              </div>

              <div class="form-group">
                <label for="email">E-posta</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="formData.email" 
                  required
                  placeholder="E-posta adresiniz"
                >
              </div>

              <div class="form-group">
                <label for="subject">Konu</label>
                <input 
                  type="text" 
                  id="subject" 
                  v-model="formData.subject" 
                  required
                  placeholder="Mesajınızın konusu"
                >
              </div>

              <div class="form-group">
                <label for="message">Mesaj</label>
                <textarea 
                  id="message" 
                  v-model="formData.message" 
                  required
                  placeholder="Mesajınız"
                  rows="5"
                ></textarea>
              </div>

              <button type="submit" class="submit-btn">
                Gönder
                <i class="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Harita -->
    <section class="map-section">
      <div class="container">
        <div class="map-container animate__animated animate__fadeInUp">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192698.6201976359!2d28.871754254979244!3d41.005495809214984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1682523690404!5m2!1str!2str"
            width="100%" 
            height="450" 
            style="border:0;" 
            allowfullscreen
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import 'animate.css'

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = () => {
  // Form gönderme işlemi burada yapılacak
  console.log('Form data:', formData.value)
  // API çağrısı yapılacak
  // Başarılı/başarısız durumuna göre kullanıcıya bilgi verilecek
}
</script>

<style scoped>
.contact {
  min-height: 100vh;
}

/* Banner */
.banner {
  position: relative;
  height: 40vh;
  display: flex;
  align-items: center;
  background-image: url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074');
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

/* İletişim Bölümü */
.contact-section {
  padding: var(--spacing-2xl) 0;
  background: var(--bg-white);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-2xl);
}

/* İletişim Bilgileri */
.contact-info {
  padding: var(--spacing-xl);
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  color: var(--text-white);
}

.contact-info h2 {
  margin-bottom: var(--spacing-xl);
  color: var(--accent-color);
}

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--spacing-lg);
}

.info-icon {
  font-size: 1.5rem;
  margin-right: var(--spacing-md);
  color: var(--accent-color);
}

.info-content h3 {
  margin-bottom: var(--spacing-xs);
  color: var(--text-white);
}

.info-content p {
  color: var(--text-white);
  opacity: 0.8;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-color);
  color: var(--primary-color);
  border-radius: 50%;
  transition: var(--transition-normal);
}

.social-link:hover {
  background: var(--accent-hover);
  transform: translateY(-3px);
}

/* İletişim Formu */
.contact-form {
  padding: var(--spacing-xl);
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  color: var(--text-white);
}

.contact-form h2 {
  margin-bottom: var(--spacing-xl);
  color: var(--accent-color);
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  color: var(--text-white);
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: var(--spacing-sm);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-white);
  transition: var(--transition-normal);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px rgba(var(--accent-rgb), 0.1);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.submit-btn {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--accent-color);
  color: var(--primary-color);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.submit-btn:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
}

.submit-btn i {
  font-size: 1.1rem;
}

/* Harita */
.map-section {
  padding: var(--spacing-2xl) 0;
  background: var(--bg-white);
}

.map-container {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 4px solid var(--primary-color);
}

/* Responsive */
@media (max-width: 768px) {
  .banner-title {
    font-size: 2.5rem;
  }

  .banner-description {
    font-size: 1.2rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .contact-info,
  .contact-form {
    padding: var(--spacing-lg);
  }
}
</style> 
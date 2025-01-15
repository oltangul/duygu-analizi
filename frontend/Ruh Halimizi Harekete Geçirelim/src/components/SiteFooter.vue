<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-content">
        <!-- Logo ve Açıklama -->
        <div class="footer-about">
          <h3 class="footer-title">Ruh Halinizi Oluşturun</h3>
          <p class="footer-description">
            Duygusal zekânızı geliştirin, ruh halinizi analiz edin ve kendinizi daha iyi tanıyın.
          </p>
          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        <!-- Hızlı Bağlantılar -->
        <div class="footer-links">
          <h4 class="footer-subtitle">Hızlı Bağlantılar</h4>
          <ul>
            <li><router-link to="/">Ana Sayfa</router-link></li>
            <li><router-link to="/about">Hakkımızda</router-link></li>
            <li><router-link to="/contact">İletişim</router-link></li>
            <li><router-link to="/register">Kayıt Ol</router-link></li>
          </ul>
        </div>

        <!-- İletişim Bilgileri -->
        <div class="footer-contact">
          <h4 class="footer-subtitle">İletişim</h4>
          <ul>
            <li>
              <i class="fas fa-map-marker-alt"></i>
              <span>İstanbul, Türkiye</span>
            </li>
            <li>
              <i class="fas fa-phone"></i>
              <span>+90 555 123 4567</span>
            </li>
            <li>
              <i class="fas fa-envelope"></i>
              <span>info@ruhhaliniziolusturun.com</span>
            </li>
          </ul>
        </div>

        <!-- Bülten -->
        <div class="footer-newsletter">
          <h4 class="footer-subtitle">Bültenimize Katılın</h4>
          <p>Yeniliklerden haberdar olmak için bültenimize abone olun.</p>
          <form @submit.prevent="handleSubscribe" class="newsletter-form">
            <input 
              type="email" 
              placeholder="E-posta adresiniz"
              v-model="email"
              required
            >
            <button type="submit">
              <i class="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>

      <!-- Alt Footer -->
      <div class="footer-bottom">
        <p>&copy; 2024 Ruh Halinizi Oluşturun. Tüm hakları saklıdır.</p>
        <div class="footer-bottom-links">
          <a href="#">Gizlilik Politikası</a>
          <a href="#">Kullanım Koşulları</a>
          <a href="#">KVKK</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')

const handleSubscribe = () => {
  console.log('Bültene kayıt:', email.value)
  // API çağrısı yapılacak
  email.value = ''
}
</script>

<style scoped>
.site-footer {
  background-color: #000000;
  color: var(--text-white);
  padding: var(--spacing-2xl) 0 var(--spacing-lg);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
}

.footer-about {
  grid-column: span 1;
}

.footer-title {
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-bottom: var(--spacing-md);
}

.footer-description {
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.social-links {
  display: flex;
  gap: var(--spacing-md);
}

.social-link {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-normal);
}

.social-link:hover {
  background: var(--accent-color);
  color: var(--primary-color);
  transform: translateY(-3px);
}

.footer-subtitle {
  color: var(--accent-color);
  margin-bottom: var(--spacing-lg);
  font-size: 1.2rem;
}

.footer-links ul,
.footer-contact ul {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: var(--spacing-sm);
}

.footer-links a {
  color: var(--text-white);
  text-decoration: none;
  opacity: 0.8;
  transition: var(--transition-normal);
}

.footer-links a:hover {
  color: var(--accent-color);
  opacity: 1;
}

.footer-contact li {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  opacity: 0.8;
}

.footer-contact i {
  color: var(--accent-color);
  font-size: 1.2rem;
}

.newsletter-form {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.newsletter-form input {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-white);
}

.newsletter-form input:focus {
  outline: none;
  border-color: var(--accent-color);
}

.newsletter-form button {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--accent-color);
  border: none;
  border-radius: var(--radius-md);
  color: var(--primary-color);
  cursor: pointer;
  transition: var(--transition-normal);
}

.newsletter-form button:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
}

.footer-bottom {
  padding-top: var(--spacing-xl);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-bottom p {
  opacity: 0.8;
}

.footer-bottom-links {
  display: flex;
  gap: var(--spacing-lg);
}

.footer-bottom-links a {
  color: var(--text-white);
  text-decoration: none;
  opacity: 0.8;
  transition: var(--transition-normal);
}

.footer-bottom-links a:hover {
  color: var(--accent-color);
  opacity: 1;
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-md);
  }

  .footer-bottom-links {
    justify-content: center;
  }
}
</style> 
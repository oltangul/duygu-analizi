<template>
  <div class="register">
    <!-- Üst Banner -->
    <section class="banner">
      <div class="banner-overlay"></div>
      <div class="container">
        <h1 class="banner-title animate__animated animate__fadeIn">Kayıt Ol</h1>
        <p class="banner-description animate__animated animate__fadeInUp animate__delay-1s">
          Duygusal yolculuğunuza başlamak için hesap oluşturun
        </p>
      </div>
    </section>

    <!-- Kayıt Formu -->
    <section class="form-section">
      <div class="container">
        <div class="form-container animate__animated animate__fadeInUp">
          <form @submit.prevent="handleRegister" class="register-form">
            <div class="form-header">
              <h2>Hesap Oluştur</h2>
              <p>Kişisel bilgilerinizi girin</p>
            </div>

            <!-- Hata Mesajı -->
            <div v-if="error" class="error-message">
              {{ error }}
            </div>

            <div class="form-group">
              <label for="name">Ad Soyad</label>
              <div class="input-group">
                <i class="fas fa-user"></i>
                <input 
                  type="text" 
                  id="name" 
                  v-model="formData.name" 
                  required
                  placeholder="Adınız ve soyadınız"
                  :disabled="loading"
                >
              </div>
            </div>

            <div class="form-group">
              <label for="email">E-posta</label>
              <div class="input-group">
                <i class="fas fa-envelope"></i>
                <input 
                  type="email" 
                  id="email" 
                  v-model="formData.email" 
                  required
                  placeholder="E-posta adresiniz"
                  :disabled="loading"
                >
              </div>
            </div>

            <div class="form-group">
              <label for="password">Şifre</label>
              <div class="input-group">
                <i class="fas fa-lock"></i>
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="formData.password" 
                  required
                  placeholder="Şifreniz"
                  :disabled="loading"
                >
                <button 
                  type="button" 
                  class="password-toggle"
                  @click="showPassword = !showPassword"
                >
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label for="confirmPassword">Şifre Tekrar</label>
              <div class="input-group">
                <i class="fas fa-lock"></i>
                <input 
                  :type="showConfirmPassword ? 'text' : 'password'" 
                  id="confirmPassword" 
                  v-model="formData.confirmPassword" 
                  required
                  placeholder="Şifrenizi tekrar girin"
                  :disabled="loading"
                >
                <button 
                  type="button" 
                  class="password-toggle"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label class="checkbox-container">
                <input 
                  type="checkbox" 
                  v-model="formData.terms" 
                  required
                  :disabled="loading"
                >
                <span class="checkmark"></span>
                <span class="terms-text">
                  <a href="#" class="terms-link">Kullanım Koşulları</a>'nı ve
                  <a href="#" class="terms-link">Gizlilik Politikası</a>'nı kabul ediyorum
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              class="submit-btn"
              :disabled="loading"
            >
              <i class="fas fa-user-plus"></i>
              {{ loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol' }}
            </button>

            <div class="social-login">
              <p>veya şununla kayıt olun:</p>
              <div class="social-buttons">
                <button 
                  type="button" 
                  class="social-btn google"
                  :disabled="loading"
                >
                  <i class="fab fa-google"></i>
                  Google
                </button>
                <button 
                  type="button" 
                  class="social-btn facebook"
                  :disabled="loading"
                >
                  <i class="fab fa-facebook-f"></i>
                  Facebook
                </button>
              </div>
            </div>

            <div class="form-footer">
              <p>
                Zaten hesabınız var mı?
                <router-link to="/login" class="login-link">Giriş yapın</router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/api'
import { AxiosError } from 'axios'
import 'animate.css'

const router = useRouter()
const loading = ref(false)
const error = ref('')

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const handleRegister = async () => {
  try {
    // Şifre kontrolü
    if (formData.value.password !== formData.value.confirmPassword) {
      error.value = 'Şifreler eşleşmiyor!'
      return
    }

    // Kullanım koşulları kontrolü
    if (!formData.value.terms) {
      error.value = 'Kullanım koşullarını kabul etmelisiniz!'
      return
    }

    loading.value = true
    error.value = ''
    
    const response = await authService.register({
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password
    })

    // Başarılı kayıt
    console.log('Kayıt başarılı:', response)
    router.push('/survey')
  } catch (err: unknown) {
    const axiosError = err as AxiosError<{ message: string }>
    error.value = axiosError.response?.data?.message || 'Kayıt olurken bir hata oluştu'
    console.error('Kayıt hatası:', axiosError)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register {
  min-height: 100vh;
}

/* Banner */
.banner {
  position: relative;
  height: 40vh;
  display: flex;
  align-items: center;
  background-image: url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070');
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

/* Form Bölümü */
.form-section {
  padding: var(--spacing-2xl) 0;
  background: var(--bg-white);
}

.form-container {
  max-width: 500px;
  margin: 0 auto;
}

.register-form {
  background: var(--bg-primary);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  color: var(--text-white);
}

.form-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.form-header h2 {
  color: var(--accent-color);
  margin-bottom: var(--spacing-xs);
}

.form-header p {
  color: var(--text-white);
  opacity: 0.8;
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  color: var(--text-white);
  font-weight: 500;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-group i {
  position: absolute;
  left: var(--spacing-md);
  color: var(--accent-color);
}

.input-group input {
  width: 100%;
  padding: var(--spacing-md);
  padding-left: calc(var(--spacing-md) * 2 + 1rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-white);
  transition: var(--transition-normal);
}

.input-group input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px rgba(var(--accent-rgb), 0.1);
}

.input-group input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.password-toggle {
  position: absolute;
  right: var(--spacing-md);
  background: none;
  border: none;
  color: var(--accent-color);
  cursor: pointer;
  padding: 0;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  color: var(--text-white);
  opacity: 0.8;
  gap: var(--spacing-sm);
}

.checkbox-container input {
  margin-top: 4px;
}

.terms-text {
  font-size: 0.9rem;
  line-height: 1.4;
}

.terms-link {
  color: var(--accent-color);
  text-decoration: none;
  transition: var(--transition-normal);
}

.terms-link:hover {
  color: var(--accent-hover);
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
  margin-bottom: var(--spacing-xl);
}

.submit-btn:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
}

.social-login {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.social-login p {
  color: var(--text-white);
  opacity: 0.8;
  margin-bottom: var(--spacing-md);
  position: relative;
}

.social-login p::before,
.social-login p::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 25%;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
}

.social-login p::before {
  left: 0;
}

.social-login p::after {
  right: 0;
}

.social-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.social-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-white);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.social-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.social-btn i {
  font-size: 1.2rem;
}

.social-btn.google i {
  color: #db4437;
}

.social-btn.facebook i {
  color: #4267B2;
}

.form-footer {
  text-align: center;
  color: var(--text-white);
  opacity: 0.8;
}

.login-link {
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition-normal);
}

.login-link:hover {
  color: var(--accent-hover);
}

/* Responsive */
@media (max-width: 768px) {
  .banner-title {
    font-size: 2.5rem;
  }

  .banner-description {
    font-size: 1.2rem;
  }

  .register-form {
    padding: var(--spacing-xl);
  }

  .social-buttons {
    grid-template-columns: 1fr;
  }
}

/* Hata Mesajı Stili */
.error-message {
  background-color: rgba(255, 0, 0, 0.1);
  color: #ff0000;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

/* Loading Durumu */
.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.input-group input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style> 
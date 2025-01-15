<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="container">
      <router-link to="/" class="logo animate__animated animate__fadeIn">
        Duygu Analizi
      </router-link>

      <button class="mobile-menu-button" @click="toggleMenu" :class="{ 'is-active': isMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav class="nav" :class="{ 'nav-open': isMenuOpen }">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path"
          class="nav-link animate__animated animate__fadeIn"
          :class="[item.class, { 'active': currentRoute === item.path }]"
          :style="{ 'animation-delay': `${item.delay}s` }"
        >
          {{ item.text }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import 'animate.css'

defineOptions({
  name: 'SiteNavbar'
})

const route = useRoute()
const isScrolled = ref(false)
const isMenuOpen = ref(false)

const currentRoute = computed(() => route.path)

const menuItems = [
  { path: '/', text: 'Anasayfa', delay: 0.1 },
  { path: '/about', text: 'Hakkımızda', delay: 0.2 },
  { path: '/contact', text: 'İletişim', delay: 0.3 },
  { path: '/register', text: 'Kayıt Ol', class: 'register', delay: 0.4 },
  { path: '/login', text: 'Giriş', class: 'login', delay: 0.5 }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--primary-color);
  box-shadow: var(--shadow-md);
  z-index: 1000;
  transition: all 0.3s ease;
}

.header-scrolled {
  background: var(--primary-color);
  box-shadow: var(--shadow-lg);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-white);
  text-decoration: none;
  transition: all 0.3s ease;
}

.logo:hover {
  color: var(--accent-color);
  transform: translateY(-2px);
}

.nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: var(--text-white);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--accent-color);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.nav-link:hover {
  color: var(--accent-color);
  transform: translateY(-2px);
}

.nav-link.active {
  color: var(--accent-color);
}

.nav-link.register {
  background: var(--accent-color);
  color: var(--primary-color);
  font-weight: 600;
}

.nav-link.register:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
}

.nav-link.login {
  border: 2px solid var(--accent-color);
  color: var(--accent-color);
}

.nav-link.login:hover {
  background: var(--accent-color);
  color: var(--primary-color);
  transform: translateY(-2px);
}

.mobile-menu-button {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.mobile-menu-button span {
  width: 30px;
  height: 3px;
  background: var(--text-white);
  border-radius: 10px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
}

.mobile-menu-button.is-active span {
  background: var(--accent-color);
}

.mobile-menu-button.is-active span:first-child {
  transform: rotate(45deg);
}

.mobile-menu-button.is-active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-button.is-active span:last-child {
  transform: rotate(-45deg);
}

@media (max-width: 768px) {
  .mobile-menu-button {
    display: flex;
  }

  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--primary-color);
    flex-direction: column;
    padding: 5rem 2rem;
    gap: 1.5rem;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    z-index: 5;
  }

  .nav-open {
    transform: translateX(0);
  }

  .nav-link {
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
  }

  .container {
    padding: 1rem;
  }
}

/* Animasyon Sınıfları */
.animate__animated {
  animation-duration: 0.6s;
}

.nav-link.animate__fadeIn {
  opacity: 0;
  animation: fadeIn 0.6s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 
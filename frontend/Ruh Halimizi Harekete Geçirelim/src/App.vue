<script setup lang="ts">
import SiteNavbar from './components/SiteNavbar.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <SiteNavbar />
  <router-view />
  <SiteFooter />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

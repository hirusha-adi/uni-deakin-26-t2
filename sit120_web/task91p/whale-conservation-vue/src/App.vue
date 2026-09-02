<template>
  <div id="app-layout">
    <HeaderComponent />
    <MainContent />
    <FooterComponent />
  </div>
</template>

<script setup>
import MainContent from './components/MainContent.vue'
</script>

<style>
#app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>

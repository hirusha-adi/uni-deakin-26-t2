<template>
  <div id="app-layout">
    <!-- TODO: Assemble the HeaderComponent, MainContent layout core, and FooterComponent -->
    <!-- DONE -->
    <HeaderComponent />
    <MainContent />
    <FooterComponent />
  </div>
</template>

<script setup>
// TODO: Import the MainContent child layout component
// DONE
import MainContent from './components/MainContent.vue'
</script>

<style>
#app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>

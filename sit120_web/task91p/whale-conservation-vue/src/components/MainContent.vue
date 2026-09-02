<template>
  <main>
    <!-- Featured: Whale Conservation Section -->
    <section id="feature">
      <!-- TODO: Add featured section content from the provided HTML template -->

      <!-- Dynamic image binding: whaleImg is imported from assets/ above -->
      <img :src="whaleImg" alt="Whale in the ocean">
    </section>

    <!-- About Us Section -->
    <section id="about">
      <!-- TODO: Add about section content from the provided HTML template -->
    </section>

    <!-- Donate Section -->
    <section id="donate">
      <!-- TODO: Add donate section content from the provided HTML template -->
      <!-- NOTE: This specific form uses standard HTML validation only; do not add Vue reactivity here -->
    </section>

    <!-- TODO: Render the locally imported ContactForm component here -->
  </main>
</template>

<script setup>
// Import the local asset so the Vite compiler asset pipeline processes it correctly
import whaleImg from '../assets/whale-image.jpg'
// TODO: Import ContactForm from './ContactForm.vue'
</script>

<style scoped>
/* TODO: Add layout styles specific to MainContent templates */
</style>

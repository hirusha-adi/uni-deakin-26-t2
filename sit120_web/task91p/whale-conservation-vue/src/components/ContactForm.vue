<template>
  <section id="contact">
    <!-- TODO: Add contact section heading and description -->
    <form @submit.prevent="handleSubmit">
      <!-- TODO: Add form elements for name, email, and message -->
      <!-- Use v-model to bind each distinct form element to your reactive state -->

      <!-- TODO: Add standard form submit button -->
    </form>

    <!-- Displays only when showConfirmation is true (use v-show directive below) -->
    <div v-show="showConfirmation" class="confirmation-box">
      <p>Thank you, <strong>{{ submittedName }}</strong>! We have received your message and will get back to you shortly.</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// TODO: Create reactive state for a form data property object
// TODO: Create reactive state named 'showConfirmation' for showing/hiding the confirmation box
// TODO: Create reactive state for tracking the submitted name

function handleSubmit() {
  // TODO: Validate that required fields are completely filled
  // TODO: Capture and store the submitted user name
  // TODO: Toggle the showConfirmation message state to true
  // TODO: Clear all bound form entry properties
}
</script>

<style scoped>
.confirmation-box {
  margin-top: 15px;
  padding: 15px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 6px;
}

/* TODO: Add localised UI presentation styles for your form input elements */
</style>

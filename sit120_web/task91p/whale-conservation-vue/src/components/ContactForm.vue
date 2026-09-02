<template>
  <section id="contact">
    <!-- TODO: Add contact section heading and description -->
    <!-- DONE -->
    <h2>Contact Us</h2>
    <p>If you have any questions or would like to get involved, please reach out to us. We would love to hear from you!</p>

    <form @submit.prevent="handleSubmit">
      <!-- TODO: Add form elements for name, email, and message -->
      <!-- Use v-model to bind each distinct form element to your reactive state -->
      <!-- DONE -->
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" v-model="formData.name" required>

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" v-model="formData.email" required>

      <label for="message">Message:</label>
      <textarea id="message" name="message" rows="4" v-model="formData.message" required></textarea>

      <!-- TODO: Add standard form submit button -->
      <!-- DONE -->
      <button type="submit">Send Message</button>
    </form>

    <div v-show="showConfirmation" class="confirmation-box">
      <p>Thank you, <strong>{{ submittedName }}</strong>! We have received your message and will get back to you shortly.</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// TODO: Create reactive state for a form data property object
// DONE
const formData = ref({
  name: '',
  email: '',
  message: ''
})

// TODO: Create reactive state named 'showConfirmation' for showing/hiding the confirmation box
// DONE
const showConfirmation = ref(false)

// TODO: Create reactive state for tracking the submitted name
// DONE
const submittedName = ref('')

function handleSubmit() {
  // TODO: Validate that required fields are completely filled
  // DONE
  if (!formData.value.name || !formData.value.email || !formData.value.message) {
    return
  }

  // TODO: Capture and store the submitted user name
  // DONE
  submittedName.value = formData.value.name

  // TODO: Toggle the showConfirmation message state to true
  // DONE
  showConfirmation.value = true

  // TODO: Clear all bound form entry properties
  // DONE
  formData.value = { name: '', email: '', message: '' }
}
</script>

<style scoped>
#contact {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

form button {
  margin-top: 0.5rem;
  background-color: #0d6efd;
}

form button:hover {
  background-color: #0b5ed7;
}

.confirmation-box {
  margin-top: 15px;
  padding: 15px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 6px;
}

/* TODO: Add localised UI presentation styles for your form input elements */
/* DONE */
</style>

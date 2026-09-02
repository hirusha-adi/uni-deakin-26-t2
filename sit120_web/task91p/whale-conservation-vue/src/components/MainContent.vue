<template>
  <main>
    <!-- Featured: Whale Conservation Section -->
    <section id="feature">
      <h2>Featured: Whale Conservation</h2>
      <p>Learn about our efforts to protect whale populations worldwide and how you can help. Our mission is to raise
        awareness and support for whale conservation through education, advocacy, and community involvement.</p>
      <div class="feature-media">
        <img :src="whaleImg" alt="Whales in the ocean">
        <a href="#donate" class="btn-help">Help the Whale</a>
      </div>
    </section>

    <!-- About Us Section -->
    <section id="about">
      <h2>About Us</h2>
      <p>We are dedicated to preserving whale species and their habitats through education and advocacy. Founded in
        2001, our organisation has been at the forefront of whale conservation, working with global partners to
        ensure the survival of these majestic creatures.</p>
      <h3>Our Mission</h3>
      <p>Our mission is to protect whales and their habitats through comprehensive conservation strategies, public
        education, and policy advocacy. We aim to reduce the impact of human activities on whale populations and
        ensure a future where whales thrive.</p>
      <h3>Our Impact</h3>
      <ul>
        <li>Over 500 whales rescued and rehabilitated</li>
        <li>Numerous awareness campaigns reaching millions worldwide</li>
        <li>Active collaboration with international conservation organisations</li>
      </ul>
    </section>

    <!-- Donate Section -->
    <section id="donate">
      <h2>Donate</h2>
      <p>Your contribution helps fund important research and conservation projects. Every donation, big or small,
        makes a difference in protecting whale populations and preserving their natural habitats.</p>
      <h3>How Your Donation Helps</h3>
      <p>Donations support various initiatives, including:</p>
      <ul>
        <li>Whale tracking and research programmes</li>
        <li>Rescue and rehabilitation of stranded whales</li>
        <li>Public education and outreach programmes</li>
        <li>Advocacy for stronger conservation policies</li>
      </ul>
      <h3>Donation Form</h3>
      <!-- NOTE: This specific form uses standard HTML validation only; do not add Vue reactivity here -->
      <form>
        <label for="donor-name">Name:</label>
        <input type="text" id="donor-name" name="donor-name" required>
        <label for="donor-email">Email:</label>
        <input type="email" id="donor-email" name="donor-email" required>
        <label for="donation-amount">Donation Amount:</label>
        <input type="number" id="donation-amount" name="donation-amount" min="1" required>
        <button type="submit">Donate Now</button>
      </form>
    </section>

    <ContactForm />
  </main>
</template>

<script setup>
import whaleImg from '../assets/whale-image.jpg'
import ContactForm from './ContactForm.vue'
</script>

<style scoped>
main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

main section {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.feature-media {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.feature-media img {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
}

.btn-help {
  background-color: #2e9e4e;
  color: #fff;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
}

.btn-help:hover {
  background-color: #257e3f;
}

#donate form,
#donate form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

@media (min-width: 1024px) {
  main {
    padding: 2rem;
    gap: 2rem;
  }

  .feature-media img {
    max-width: 500px;
  }
}
</style>

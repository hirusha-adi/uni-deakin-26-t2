<template>
  <header>
    <!-- TODO: Add header content from the provided HTML template -->
    <!-- DONE -->
    <h1>Save the Whales</h1>
    <a href="#donate" class="btn-donate">Donate Now</a>
  </header>
</template>

<script setup>
// Component logic can be added here if needed
</script>

<style scoped>
/* TODO: Style the header */
/* DONE */
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background-color: #0b3d66;
  color: #fff;
}

header h1 {
  font-size: 1.25rem;
  margin: 0;
  color: #fff;
}

.btn-donate {
  background-color: #2e9e4e;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  white-space: nowrap;
}

.btn-donate:hover {
  background-color: #257e3f;
}

@media (min-width: 1024px) {
  header {
    padding: 1rem 2.5rem;
  }

  header h1 {
    font-size: 1.5rem;
  }
}
</style>

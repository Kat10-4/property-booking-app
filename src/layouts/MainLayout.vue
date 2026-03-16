<!-- layouts/MainLayout.vue -->
<template>
  <div class="layout">
    <header class="app-header">
      <h1>My Property List</h1>
    </header>

    <main class="app-main">
      <!-- This renders the current page (PropertyList OR PropertyItem OR ReservationForm) -->
      <router-view />
    </main>

    <footer class="app-footer">
      <p>&copy; 2024 Property Rentals. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  margin: 0;
  font-size: 2rem;
}

.app-main {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.app-footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
</style>

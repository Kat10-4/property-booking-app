<!-- views/NotFound.vue -->
<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you're looking for doesn't exist or has been moved.</p>
    <router-link to="/" class="home-link"> Go Back Home </router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 100px 20px;
  max-width: 600px;
  margin: 0 auto;
}

.not-found h1 {
  font-size: 6rem;
  color: #4caf50;
  margin: 0;
}

.not-found h2 {
  font-size: 2rem;
  color: #333;
  margin: 20px 0;
}

.not-found p {
  color: #666;
  margin: 20px 0;
  font-size: 1.1rem;
}

.home-link {
  display: inline-block;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 4px;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.home-link:hover {
  background-color: #45a049;
}
</style>

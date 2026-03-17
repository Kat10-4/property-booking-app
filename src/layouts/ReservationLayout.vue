<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ROUTE_PATHS, ROUTE_NAMES } from '../router/routes'
import { usePropertiesStore } from '../stores/store'
import { computed } from 'vue'
import PropertyCard from '@/components/PropertyCard.vue'

const router = useRouter()
const route = useRoute()
const store = usePropertiesStore()

// Go back to property list
const goBack = () => {
  router.push({ name: ROUTE_NAMES.PROPERTY_LIST })
}

// Go back to the current property
const goToProperty = (propertyId) => {
  router.push(ROUTE_PATHS.PROPERTY_ITEM(propertyId))
}

// // Determine current step based on route
// const currentStep = computed(() => {
//   if (route.path.includes('payment')) return 2
//   if (route.path.includes('confirm')) return 3
//   return 1
// })

// // Show progress only on certain steps
// const showProgress = computed(() => {
//   return !route.path.includes('complete')
// })
</script>

<template>
  <div class="reservation-layout">
    <header class="reservation-header">
      <div class="header-content">
        <button @click="goBack" class="back-button">← Back to Property List</button>
        <h1>Complete Your Reservation</h1>
        <div class="header-progress" v-if="showProgress">
          <span class="step" :class="{ active: currentStep >= 1 }">1. Details</span>
          <span class="step" :class="{ active: currentStep >= 2 }">2. Payment</span>
          <span class="step" :class="{ active: currentStep >= 3 }">3. Confirm</span>
        </div>
      </div>
    </header>

    <main class="reservation-main">
      <!-- Property summary card (optional) -->
      <PropertyCard :property="store.currentProperty" @click="goToProperty" />

      <!-- This renders the current reservation step -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="reservation-footer">
      <p>&copy; 2024 Property Rentals. Secure checkout powered by Stripe</p>
    </footer>
  </div>
</template>

<style scoped>
.reservation-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
}

.reservation-header {
  background: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.back-button {
  position: absolute;
  left: 0;
  top: 20%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #4a5568;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #f0f0f0;
  color: #2d3748;
}

.reservation-header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #2d3748;
  text-align: center;
  font-weight: 500;
}

.header-progress {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.step {
  color: #a0aec0;
  font-size: 0.9rem;
  font-weight: 500;
  position: relative;
}

.step.active {
  color: #4caf50;
}

.step.active::after {
  content: '';
  position: absolute;
  bottom: -1rem;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #4caf50;
}

.reservation-main {
  flex: 1;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
}

.reservation-footer {
  background: white;
  border-top: 1px solid #e0e0e0;
  color: #718096;
  text-align: center;
  padding: 1.5rem;
  font-size: 0.9rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive design */
@media (max-width: 768px) {
  .reservation-main {
    grid-template-columns: 1fr;
  }

  .header-progress {
    gap: 1rem;
    font-size: 0.8rem;
  }

  .back-button {
    position: static;
    transform: none;
    margin-bottom: 1rem;
    display: block;
  }

  .reservation-header h1 {
    font-size: 1.2rem;
  }
}
</style>

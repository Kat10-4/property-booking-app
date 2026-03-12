<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ROUTE_PATHS } from '@/router/routes'
import { usePropertiesStore } from '../stores/store'
import DatePicker from '@/components/DatePicker.vue'
import AmenitiesList from '@/components/AmenitiesList.vue'

const route = useRoute()
const router = useRouter()
const store = usePropertiesStore()
const propertyId = route.params.id

onMounted(() => {
  store.setCurrentProperty(propertyId)
})

const goBack = () => {
  store.clearCurrentProperty()
  router.push(ROUTE_PATHS.PROPERTY_LIST)
}

const goToReservation = () => {
  router.push(ROUTE_PATHS.RESERVATION(propertyId))
}
</script>

<template>
  <div class="property-item">
    <button @click="goBack" class="back-btn">← Back to Properties</button>

    <div v-if="store.loading" class="loading">Loading property...</div>

    <div v-else-if="store.error" class="error">
      {{ store.error }}
      <button @click="goBack" class="btn">Go Back</button>
    </div>

    <div v-else-if="store.currentProperty" class="property-details">
      <h1>{{ store.currentProperty.name }}</h1>

      <div class="details-card">
        <p><strong>📍 Location:</strong> {{ store.currentProperty.address }}</p>
        <p><strong>💰 Price:</strong> ${{ store.currentProperty.price }}/night</p>
        <p><strong>👥 Max guests:</strong> {{ store.currentProperty.personCapacity }}</p>
        <p><strong>📝 Description:</strong> {{ store.currentProperty.description }}</p>
        <AmenitiesList
          v-if="store.currentProperty.listingAmenities"
          :items="store.currentProperty.listingAmenities"
          title="Amenities:"
          :initial-visible="4"
          item-key="id"
          display-name="amenityName"
        />
      </div>

      <!-- Date Range Picker -->
      <div class="date-picker-section">
        <h3>Select your dates</h3>
        <div class="date-input-wrapper">
          <DatePicker :disabledDates="bookedDates" @dates-selected="handleDates" />
        </div>
        <button @click="goToReservation" class="book-btn">Book This Property</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.property-item {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.back-btn {
  background: none;
  border: none;
  color: #4caf50;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
}

.property-details h1 {
  color: #333;
  margin-bottom: 20px;
}

.details-card {
  background: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.details-card p {
  margin: 10px 0;
  line-height: 1.6;
}

.amenities {
  margin-top: 20px;
}

.amenities ul {
  list-style-type: none;
  padding-left: 0;
}

.amenities li {
  padding: 5px 0;
  padding-left: 20px;
  position: relative;
}

.amenities li:before {
  content: '✓';
  color: #4caf50;
  position: absolute;
  left: 0;
}

.book-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

.book-btn:hover {
  background-color: #45a049;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
}

.btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
</style>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePropertiesStore } from '../stores/store'
import PropertyCard from '../components/PropertyCard.vue'
import { ROUTE_PATHS } from '@/router/routes'

const router = useRouter()
const store = usePropertiesStore()

onMounted(async () => {
  await store.fetchProperties()
})

const goToProperty = (propertyId) => {
  store.setCurrentProperty(propertyId)
  router.push(ROUTE_PATHS.PROPERTY_ITEM(propertyId))
}
</script>

<template>
  <div class="property-list">
    <h1>Available Properties</h1>
    <p class="subtitle">Click on any property to view details</p>

    <!-- Show loading state -->
    <div v-if="store.loading" class="loading">Loading properties...</div>

    <!-- Show error if any -->
    <div v-else-if="store.error" class="error">
      {{ store.error }}
    </div>

    <!-- Show properties grid -->
    <div v-else class="properties-grid">
      <!-- This will render ALL properties from the store -->
      <PropertyCard
        v-for="property in store.properties"
        :key="property.id"
        :property="property"
        @click="goToProperty"
      />
    </div>
  </div>
</template>

<style scoped>
.property-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 40px;
  font-size: 1.1rem;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
}

.loading,
.error,
.no-properties {
  text-align: center;
  padding: 60px;
  font-size: 1.2rem;
  color: #666;
}

.error {
  color: #dc3545;
}
</style>

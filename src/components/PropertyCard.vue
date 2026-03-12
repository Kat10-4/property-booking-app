<script setup>
defineProps({
  property: {
    type: Object,
    required: true,
  },
})

defineEmits(['click']) //say to the parent component that it was 'clicked'
</script>

<template>
  <div class="property-card" @click="$emit('click', property.id)">
    <div class="image-placeholder">
      <img
        v-if="property.listingImages[0].url"
        :src="property.listingImages[0].url"
        :alt="property.name"
      />
      <div v-else class="no-image">🏠</div>
    </div>

    <h3>{{ property.name }}</h3>
    <p class="location">📍 {{ property.address }}</p>
    <p class="price">💰 ${{ property.price }}/night</p>
    <p class="guests">👥 Up to {{ property.personCapacity }} guests</p>

    <button class="view-btn">View Details →</button>
  </div>
</template>

<style scoped>
.property-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.property-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: #4caf50;
}

.image-placeholder {
  width: 100%;
  height: 200px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}

.image-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.property-card h3 {
  margin: 15px 15px 10px;
  color: #333;
  font-size: 1.3rem;
}

.property-card p {
  margin: 5px 15px;
  color: #666;
}

.location {
  color: #888;
  font-size: 0.9rem;
}

.price {
  font-weight: bold;
  color: #4caf50 !important;
}

.guests {
  font-size: 0.9rem;
}

.view-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin: 15px;
  width: calc(100% - 30px);
  font-size: 1rem;
  transition: background-color 0.3s;
}

.view-btn:hover {
  background-color: #45a049;
}
</style>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: 'Amenities:',
  },
  initialVisible: {
    type: Number,
    default: 4,
  },
})

const showAll = ref(false)

const visibleItems = computed(() => {
  if (showAll.value) return props.items
  return props.items.slice(0, props.initialVisible)
})

const hasMoreItems = computed(() => {
  return props.items.length > props.initialVisible
})

const remainingCount = computed(() => {
  return props.items.length - props.initialVisible
})

const toggleShowAll = () => {
  showAll.value = !showAll.value
}
</script>

<template>
  <div class="amenities-section">
    <h2>{{ title }}</h2>

    <ul class="amenities-list">
      <li v-for="amenity in visibleItems" :key="amenity.amenityId">
        <span class="amenity-icon">✓</span>
        {{ amenity.amenityName }}
      </li>
    </ul>

    <button v-if="hasMoreItems" @click="toggleShowAll" class="show-more-btn">
      {{ showAll ? 'Show less' : `Show ${remainingCount} more` }}
    </button>
  </div>
</template>

<style scoped>
.amenities-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
  margin: 10px 0;
}

.amenities-list li {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
}

.amenity-icon {
  color: #4caf50;
  font-weight: bold;
}

.show-more-btn {
  background: none;
  border: none;
  color: #4caf50;
  cursor: pointer;
  padding: 8px 0;
  font-size: 14px;
  text-decoration: underline;
  margin-top: 5px;
}

.show-more-btn:hover {
  color: #45a049;
}
</style>

<script setup>
const props = defineProps({
  listingImages: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageIndex: {
    type: Number,
    default: 0,
  },
})

const bookignImageUrl = 'https://bookingenginecdn.hostaway.com/listing/'

//for one Image
const shortenImageUrl = props.listingImages?.[props.imageIndex]?.url.split('listing/')[1]
const newImageUrl = `${bookignImageUrl}${shortenImageUrl}`
</script>

<template>
  <img
    v-if="newImageUrl"
    :src="newImageUrl"
    :alt="name"
    :srcset="`
          ${newImageUrl}?width=300&quality=70&format=webp&v=2 300w,
          ${newImageUrl}?width=400&quality=70&format=webp&v=2 400w,
          ${newImageUrl}?width=600&quality=70&format=webp&v=2 600w,
          ${newImageUrl}?width=800&quality=70&format=webp&v=2 800w`"
    sizes="(max-width: 600px) 300px, (max-width: 1200px) 400px, 600px"
    loading="eager"
    decoding="async"
  />
  <img
    v-else-if="listingImages[0].url"
    :src="listingImages[0].url"
    :alt="name"
    :srcset="`
          ${listingImages[0].url}?width=300&quality=70&format=webp&v=2 300w,
          ${listingImages[0].url}?width=400&quality=70&format=webp&v=2 400w,
          ${listingImages[0].url}?width=600&quality=70&format=webp&v=2 600w,
          ${listingImages[0].url}?width=800&quality=70&format=webp&v=2 800w`"
    sizes="(max-width: 600px) 300px, (max-width: 1200px) 400px, 600px"
    loading="eager"
    decoding="async"
  />
  <div v-else class="no-image">🏠</div>
</template>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

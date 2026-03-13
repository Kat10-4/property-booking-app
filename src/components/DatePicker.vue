<script setup>
import { onMounted } from 'vue'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.css'

const props = defineProps({
  disabledDates: {
    type: Array,
  },
  datesSelected: {},
})

onMounted(() => {
  flatpickr('#datepicker', {})
})
</script>

<template>
  <input id="datepicker" type="text" placeholder="Select dates" class="date-input" />
</template>

<style scoped>
.date-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.date-input:focus {
  outline: none;
  border-color: #4caf50;
}
</style>

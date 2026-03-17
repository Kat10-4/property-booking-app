<!-- views/ReservationForm.vue -->
<template>
  <div class="reservation-form">
    <h2>Booking Details</h2>

    <!-- Date Selection -->
    <div class="form-section">
      <h3>📅 Select Your Dates</h3>
      <div class="date-picker-container">
        <div class="date-input">
          <label>Check-in</label>
          <input type="date" v-model="checkInDate" :min="today" @change="validateDates" />
        </div>
        <div class="date-input">
          <label>Check-out</label>
          <input
            type="date"
            v-model="checkOutDate"
            :min="minCheckOutDate"
            @change="calculateNights"
          />
        </div>
      </div>

      <!-- Date validation error -->
      <p v-if="dateError" class="error-message">{{ dateError }}</p>

      <!-- Nights count -->
      <div v-if="nights > 0" class="nights-summary">
        <span>{{ nights }} night{{ nights > 1 ? 's' : '' }}</span>
      </div>
    </div>

    <!-- Guest Information -->
    <div class="form-section">
      <h3>👥 Guest Information</h3>

      <div class="form-grid">
        <div class="form-group">
          <label>First Name *</label>
          <input type="text" v-model="guestInfo.firstName" placeholder="John" required />
        </div>

        <div class="form-group">
          <label>Last Name *</label>
          <input type="text" v-model="guestInfo.lastName" placeholder="Doe" required />
        </div>

        <div class="form-group">
          <label>Email *</label>
          <input type="email" v-model="guestInfo.email" placeholder="john@example.com" required />
        </div>

        <div class="form-group">
          <label>Phone</label>
          <input type="tel" v-model="guestInfo.phone" placeholder="+1 234 567 890" />
        </div>
      </div>
    </div>

    <!-- Number of Guests -->
    <div class="form-section">
      <h3>👤 Number of Guests</h3>
      <div class="guest-selector">
        <div class="guest-type">
          <span>Adults (18+)</span>
          <div class="counter">
            <button @click="decrementAdults" :disabled="adults <= 1">-</button>
            <span>{{ adults }}</span>
            <button @click="incrementAdults" :disabled="adults >= maxGuests">+</button>
          </div>
        </div>

        <div class="guest-type">
          <span>Children (0-17)</span>
          <div class="counter">
            <button @click="decrementChildren" :disabled="children <= 0">-</button>
            <span>{{ children }}</span>
            <button @click="incrementChildren" :disabled="totalGuests >= maxGuests">+</button>
          </div>
        </div>

        <p class="guest-hint">Maximum {{ maxGuests }} guests allowed</p>
      </div>
    </div>

    <!-- Special Requests -->
    <div class="form-section">
      <h3>📝 Special Requests</h3>
      <textarea
        v-model="specialRequests"
        placeholder="Any special requirements? (e.g., dietary restrictions, accessibility needs)"
        rows="4"
      ></textarea>
    </div>

    <!-- Price Breakdown -->
    <div class="price-breakdown">
      <h3>💰 Price Details</h3>
      <div class="price-row">
        <span>${{ property?.price }} x {{ nights }} nights</span>
        <span>${{ subtotal }}</span>
      </div>
      <div class="price-row">
        <span>Cleaning fee</span>
        <span>${{ cleaningFee }}</span>
      </div>
      <div class="price-row">
        <span>Service fee</span>
        <span>${{ serviceFee }}</span>
      </div>
      <div class="price-row total">
        <span>Total</span>
        <span>${{ total }}</span>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="form-actions">
      <button @click="cancelBooking" class="btn-secondary">Cancel</button>
      <button @click="proceedToPayment" class="btn-primary" :disabled="!isFormValid">
        Proceed to Payment
      </button>
    </div>

    <!-- Form validation summary -->
    <div v-if="!isFormValid && showValidation" class="validation-summary">
      <p>Please fill in all required fields:</p>
      <ul>
        <li v-if="!checkInDate">✓ Select check-in date</li>
        <li v-if="!checkOutDate">✓ Select check-out date</li>
        <li v-if="!guestInfo.firstName">✓ Enter first name</li>
        <li v-if="!guestInfo.lastName">✓ Enter last name</li>
        <li v-if="!guestInfo.email">✓ Enter email</li>
        <li v-if="dateError">✓ Fix date selection</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePropertiesStore } from '../stores/store'
import { ROUTE_NAMES } from '@/router/routes'

const route = useRoute()
const router = useRouter()
const store = usePropertiesStore()
const propertyId = route.params.id

// Form state
const checkInDate = ref('')
const checkOutDate = ref('')
const nights = ref(0)
const dateError = ref('')
const specialRequests = ref('')
const showValidation = ref(false)

// Guest counts
const adults = ref(2)
const children = ref(0)
const maxGuests = computed(() => store.currentProperty?.personCapacity || 10)

// Guest info
const guestInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
})

// Fees
const cleaningFee = 50
const serviceFeePercentage = 0.1 // 10%

// Computed properties
const today = computed(() => {
  const date = new Date()
  return date.toISOString().split('T')[0]
})

const minCheckOutDate = computed(() => {
  if (!checkInDate.value) return today.value
  const date = new Date(checkInDate.value)
  date.setDate(date.getDate() + 1)
  return date.toISOString().split('T')[0]
})

const totalGuests = computed(() => adults.value + children.value)

const property = computed(() => store.currentProperty)

const subtotal = computed(() => {
  if (!property.value?.price || !nights.value) return 0
  return property.value.price * nights.value
})

const serviceFee = computed(() => {
  return Math.round(subtotal.value * serviceFeePercentage)
})

const total = computed(() => {
  return subtotal.value + cleaningFee + serviceFee.value
})

const isFormValid = computed(() => {
  return (
    checkInDate.value &&
    checkOutDate.value &&
    !dateError.value &&
    guestInfo.value.firstName &&
    guestInfo.value.lastName &&
    guestInfo.value.email &&
    totalGuests.value <= maxGuests.value
  )
})

// Methods
onMounted(() => {
  store.setCurrentProperty(propertyId)
})

const validateDates = () => {
  if (!checkInDate.value || !checkOutDate.value) {
    dateError.value = ''
    return
  }

  const checkIn = new Date(checkInDate.value)
  const checkOut = new Date(checkOutDate.value)

  if (checkOut <= checkIn) {
    dateError.value = 'Check-out date must be after check-in date'
    nights.value = 0
  } else {
    dateError.value = ''
    calculateNights()
  }
}

const calculateNights = () => {
  if (checkInDate.value && checkOutDate.value && !dateError.value) {
    const checkIn = new Date(checkInDate.value)
    const checkOut = new Date(checkOutDate.value)
    const diffTime = Math.abs(checkOut - checkIn)
    nights.value = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }
}

const incrementAdults = () => {
  if (adults.value < maxGuests.value) {
    adults.value++
  }
}

const decrementAdults = () => {
  if (adults.value > 1) {
    adults.value--
  }
}

const incrementChildren = () => {
  if (totalGuests.value < maxGuests.value) {
    children.value++
  }
}

const decrementChildren = () => {
  if (children.value > 0) {
    children.value--
  }
}

const cancelBooking = () => {
  if (confirm('Are you sure you want to cancel this booking?')) {
    router.push({ name: ROUTE_NAMES.PROPERTY_ITEM, params: { id: propertyId } })
  }
}

const proceedToPayment = () => {
  showValidation.value = true

  if (!isFormValid.value) {
    // Scroll to top to show validation summary
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  // Create booking data object
  const bookingData = {
    propertyId,
    checkIn: checkInDate.value,
    checkOut: checkOutDate.value,
    guests: {
      adults: adults.value,
      children: children.value,
      total: totalGuests.value,
    },
    guestInfo: guestInfo.value,
    specialRequests: specialRequests.value,
    pricing: {
      nights: nights.value,
      subtotal: subtotal.value,
      cleaningFee,
      serviceFee: serviceFee.value,
      total: total.value,
    },
  }

  // Store booking data in session or store
  sessionStorage.setItem('bookingData', JSON.stringify(bookingData))

  // Navigate to payment
  router.push({
    name: 'reservation.payment',
    params: { id: propertyId },
  })
}
</script>

<style scoped>
.reservation-form {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.reservation-form h2 {
  color: #2d3748;
  margin-top: 0;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.form-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
}

.form-section h3 {
  color: #4a5568;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.date-picker-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.date-input {
  display: flex;
  flex-direction: column;
}

.date-input label {
  margin-bottom: 0.5rem;
  color: #718096;
  font-size: 0.9rem;
}

.date-input input {
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
}

.date-input input:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
}

.nights-summary {
  background: #f0f9f0;
  color: #4caf50;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: inline-block;
  font-weight: 500;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  color: #718096;
  font-size: 0.9rem;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #4caf50;
}

.guest-selector {
  max-width: 300px;
}

.guest-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.counter {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.counter button {
  width: 32px;
  height: 32px;
  border: 1px solid #e0e0e0;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.counter button:hover:not(:disabled) {
  background: #f0f0f0;
}

.counter button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.counter span {
  min-width: 30px;
  text-align: center;
}

.guest-hint {
  color: #718096;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
}

.price-breakdown {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.price-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  color: #4a5568;
}

.price-row.total {
  border-top: 2px solid #e0e0e0;
  margin-top: 0.5rem;
  padding-top: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
  color: #2d3748;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #4caf50;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #45a049;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #e0e0e0;
  color: #4a5568;
}

.btn-secondary:hover {
  background-color: #d0d0d0;
}

.error-message {
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.validation-summary {
  margin-top: 2rem;
  padding: 1rem;
  background: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 6px;
  color: #856404;
}

.validation-summary ul {
  margin: 0.5rem 0 0;
  padding-left: 1.5rem;
}

@media (max-width: 768px) {
  .reservation-form {
    padding: 1.5rem;
  }

  .date-picker-container,
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}
</style>

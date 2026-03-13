// stores/calendarStore.js
import { defineStore } from 'pinia'
import { hostawayApi } from '../api/hostawayApi'

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    calendars: {},
    selectedDates: {},
    loading: {},
    errors: {},
    // Время последнего обновления (для инвалидации кэша)
    //lastUpdated: {}
  }),

  getters: {
    // Получить календарь для конкретного listing
    getCalendar: (state) => (listingId) => {
      return state.calendars[listingId] || null
    },

    // Получить заблокированные даты (booked + blocked)
    getBlockedDates: (state) => (listingId) => {
      const calendar = state.calendars[listingId]
      if (!calendar?.result) return []

      return calendar.result
        .filter((day) => day.status === 'booked' || day.status === 'blocked')
        .map((day) => day.date)
    },

    // Получить доступные даты
    getAvailableDates: (state) => (listingId) => {
      const calendar = state.calendars[listingId]
      if (!calendar?.result) return []

      return calendar.result.filter((day) => day.status === 'available').map((day) => day.date)
    },

    // Проверить, загружается ли календарь
    isLoading: (state) => (listingId) => {
      return state.loading[listingId] || false
    },

    // Получить ошибку
    getError: (state) => (listingId) => {
      return state.errors[listingId] || null
    },

    // Получить выбранные даты
    getSelectedDates: (state) => (listingId) => {
      return state.selectedDates[listingId] || null
    },

    // Проверить, нужна ли загрузка (кэш устарел > 5 минут)
    // needsRefresh: (state) => (listingId) => {
    //   const lastUpdate = state.lastUpdated[listingId]
    //   if (!lastUpdate) return true

    //   const fiveMinutes = 5 * 60 * 1000
    //   return Date.now() - lastUpdate > fiveMinutes
    // }
  },

  actions: {
    // Загрузка календаря с кэшированием
    async fetchCalendar(listingId, force = false) {
      // Если уже загружено и не форсируем, возвращаем из кэша
      if (!force && this.calendars[listingId]) {
        console.log('📦 Using cached calendar for', listingId)
        return this.calendars[listingId]
      }

      this.loading[listingId] = true
      this.errors[listingId] = null

      try {
        console.log('🌐 Fetching calendar for listing:', listingId)
        const response = await hostawayApi.getCalendar(listingId)

        // Сохраняем в кэш
        this.calendars[listingId] = response.data
        this.lastUpdated[listingId] = Date.now()

        console.log('✅ Calendar loaded for listing:', listingId)
        return response.data
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to load calendar'
        this.errors[listingId] = errorMessage
        console.error('❌ Calendar error:', errorMessage)
        throw error
      } finally {
        this.loading[listingId] = false
      }
    },

    // Сохранить выбранные даты
    setSelectedDates(listingId, dates) {
      this.selectedDates[listingId] = dates
    },

    // Очистить календарь (при выходе из компонента)
    clearCalendar(listingId) {
      delete this.calendars[listingId]
      delete this.selectedDates[listingId]
      delete this.loading[listingId]
      delete this.errors[listingId]
      delete this.lastUpdated[listingId]
    },

    // Проверить доступность конкретных дат
    async checkAvailability(listingId, startDate, endDate) {
      try {
        // Пробуем из кэша, если нужно - загружаем
        const calendar = await this.fetchCalendar(listingId)

        if (!calendar?.result) return false

        // Создаем массив дат для проверки
        const dates = []
        const start = new Date(startDate)
        const end = new Date(endDate)

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          dates.push(d.toISOString().split('T')[0])
        }

        // Получаем заблокированные даты
        const blockedDates = calendar.result
          .filter((day) => day.status === 'booked' || day.status === 'blocked')
          .map((day) => day.date)

        // Проверяем пересечения
        const hasConflict = dates.some((date) => blockedDates.includes(date))

        return !hasConflict
      } catch (error) {
        console.error('Error checking availability:', error)
        return false
      }
    },

    // Инвалидировать кэш
    // invalidateCache(listingId) {
    //   if (listingId) {
    //     delete this.calendars[listingId]
    //     delete this.lastUpdated[listingId]
    //   } else {
    //     this.calendars = {}
    //     this.lastUpdated = {}
    //   }
    // }
  },
})

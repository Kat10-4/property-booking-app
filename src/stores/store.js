import { defineStore } from 'pinia'
import { hostawayApi } from '@/services/hostawayApi'

export const usePropertiesStore = defineStore('properties', {
  state: () => ({
    properties: [],
    currentProperty: null,
    loading: false,
    error: null,
  }),

  getters: {
    // Get property by ID
    getPropertyById: (state) => {
      return (id) => state.properties.find((p) => p.id === id)
    },
  },

  actions: {
    //fetch property listings

    async fetchProperties() {
      this.loading = true
      this.error = null
      try {
        const response = await hostawayApi.getListings()
        this.properties = response.data.result
        console.log('my properties', this.properties)
      } catch (error) {
        this.error = error.response?.data?.message || 'fetch property failed'
      } finally {
        this.loading = false
      }
    },

    // Set current property by ID
    setCurrentProperty(id) {
      const idNum = parseInt(id)
      this.currentProperty = this.properties.find((p) => p.id === idNum) || null
      if (!this.currentProperty) {
        this.error = 'Property not found'
      } else {
        this.error = null
      }
    },

    // Clear current property
    clearCurrentProperty() {
      this.currentProperty = null
    },
  },
})

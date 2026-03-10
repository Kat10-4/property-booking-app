import { defineStore } from 'pinia'

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
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch properties'
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

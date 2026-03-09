import { defineStore } from 'pinia'

export const usePropertiesStore = defineStore('properties', {
  state: () => ({
    // Array of 3 property items
    properties: [
      {
        id: 1,
        title: 'Beachfront Villa',
        location: 'Miami, Florida',
        price: 350,
        maxGuests: 6,
        description:
          'Beautiful beachfront villa with private pool and direct ocean access. Perfect for family vacations.',
        imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400',
        amenities: ['Pool', 'Beach access', 'WiFi', 'Kitchen', 'Parking'],
      },
      {
        id: 2,
        title: 'Downtown Loft',
        location: 'New York City',
        price: 200,
        maxGuests: 4,
        description:
          'Modern loft in the heart of Manhattan. Close to subway, restaurants, and attractions.',
        imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
        amenities: ['WiFi', 'Gym', 'Doorman', 'Kitchen'],
      },
      {
        id: 3,
        title: 'Mountain Cabin',
        location: 'Aspen, Colorado',
        price: 275,
        maxGuests: 5,
        description:
          'Cozy cabin with stunning mountain views. Perfect for skiing and hiking enthusiasts.',
        imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400',
        amenities: ['Fireplace', 'Hiking trails', 'WiFi', 'Hot tub'],
      },
    ],

    // For single property view
    currentProperty: null,

    // Loading state
    loading: false,

    // Error state
    error: null,
  }),

  getters: {
    // Get all properties
    getAllProperties: (state) => state.properties,

    // Get property by ID
    getPropertyById: (state) => {
      return (id) => state.properties.find((p) => p.id === id)
    },

    // Check if properties are loaded
    hasProperties: (state) => state.properties.length > 0,

    // Get total number of properties
    totalProperties: (state) => state.properties.length,
  },

  actions: {
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

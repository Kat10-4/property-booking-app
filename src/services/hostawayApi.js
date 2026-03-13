import instance from './instance'

export const hostawayApi = {
  async getListings() {
    try {
      const response = await instance.get('/v1/listings')
      return response
    } catch (error) {
      console.error('🔧 API Error:', error)
      throw error
    }
  },
  async getBedTypes() {
    try {
      const response = await instance.get('/v1/bedTypes')
      return response
    } catch (error) {
      console.error('🔧 API Error:', error)
      throw error
    }
  },
  async getCalendar(listingId) {
    try {
      const response = await instance.get(`/v1/listings/${listingId}/calendar`, {})
      return response
    } catch (error) {
      console.error('🔧 API Error:', error)
      throw error
    }
  },
  // async updateCalendar(listingId, startDate, endDate) {
  //   try {
  //     const response = await instance.put(`/v1/listings/${listingId}/calendar`, {
  //       startDate,
  //       endDate,
  //     })
  //     return response
  //   } catch (error) {
  //     console.error('🔧 API Error:', error)
  //     throw error
  //   }
  // },
}

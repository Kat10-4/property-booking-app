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
}

import instance from './instance'

export const hostawayApi = {
  async getListings() {
    try {
      const response = await instance.get('/listings')
      console.log('api response: ', response)
      return response
    } catch (error) {
      console.error('🔧 API Error:', error)
      throw error
    }
  },
}

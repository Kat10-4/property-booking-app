import axios from 'axios'
import TokenService from './token'

// Create axios instance
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cache-control': 'no-cache',
  },
})

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (!error.response || error.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      // Make refresh request
      const response = await instance.post(
        'https://api.hostaway.com/v1/accessTokens',
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: process.env.VUE_APP_CLIENT_ID,
          client_secret: process.env.VUE_APP_CLIENT_SECRET,
          scope: 'general',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',
          },
        },
      )

      const { access_token } = response.data

      // Store token
      TokenService.setToken(access_token)

      // Update headers
      instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

      // Retry original with new token
      originalRequest.headers.Authorization = `Bearer ${access_token}`
      return instance(originalRequest)
    } catch (refreshError) {
      TokenService.deleteToken()

      window.location.href = '/'
      return Promise.reject(refreshError)
    }
  },
)

export default instance

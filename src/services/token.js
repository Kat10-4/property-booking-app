import axios from 'axios'

export class TokenService {
  constructor() {
    this.TOKEN_URL = '/accessTokens'
    this.TOKEN_KEY = 'hostaway_token'
    this.TOKEN_EXPIRY_KEY = 'hostaway_token_expiry'

    this.refreshPromise = null //preventing multiple simultaneous token refresh requests
  }

  async getValidToken() {
    if (this.TOKEN_KEY && this.isTokenValid()) {
      this.setToken()
      return this.TOKEN_KEY
    }
    return this.refreshToken()
  }

  isTokenValid() {
    const expiry = this.getTokenExpiry().parseInt()
    return expiry ? Date.now() < expiry : false
  }

  async refreshToken() {
    if (this.refreshPromise) {
      return this.refreshPromise
    }

    // Create new refresh promise
    this.refreshPromise = this.requestNewToken()

    try {
      const token = await this.refreshPromise
      return token
    } finally {
      // Clear the promise after it's done
      this.refreshPromise = null
    }
  }

  async requestNewToken() {
    const response = await tokenApi.getToken()
    return response.data.access_token
  }

  setToken() {
    return localStorage.setItem('hostaway_token', this.TOKEN_KEY)
  }

  getToken() {
    return localStorage.getItem('hostaway_token')
  }
}

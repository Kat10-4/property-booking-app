class TokenService {
  constructor() {
    this.TOKEN = null
    this.TOKEN_URL = '/accessTokens'
    this.TOKEN_KEY = 'hostaway_token'
  }

  setToken(token) {
    this.TOKEN = token
    return localStorage.setItem(this.TOKEN_KEY, this.TOKEN)
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  deleteToken() {
    this.TOKEN = null
    return localStorage.removeItem(this.TOKEN_KEY)
  }
}

export default new TokenService()

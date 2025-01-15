import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Token interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const authService = {
    // Kayıt ol
    async register(userData: { name: string; email: string; password: string }) {
        const response = await api.post('/users/register', userData)
        if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
        }
        return response.data
    },

    // Giriş yap
    async login(credentials: { email: string; password: string }) {
        const response = await api.post('/users/login', credentials)
        if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
        }
        return response.data
    },

    // Çıkış yap
    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    },

    // Kullanıcı bilgilerini getir
    async getProfile() {
        return await api.get('/users/profile')
    }
}

export default api 
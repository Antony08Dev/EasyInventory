import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5124/api'

export const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'text/plain'
    },
})

// // Request interceptor
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token')
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         return config
//     },
//     (error) => {
//         return Promise.reject(error)
//     }
// )
//
// // Response interceptor
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             localStorage.removeItem('token')
//             window.location.href = '/login'
//         }
//         return Promise.reject(error)
//     }
// )


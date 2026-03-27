import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
})

// Optional: Add interceptors for auth if needed later
// api.interceptors.request.use((config) => { ... })

export default api

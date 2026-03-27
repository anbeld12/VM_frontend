import { create } from "zustand"
import api from "@/api/axios"
import type { TokenResponse, User } from "@/types/backend"
import {
  clearAuthStorage,
  getAuthToken,
  getStoredUser,
  setAuthToken,
  setStoredUser,
} from "@/utils/authStorage"

type LoginParams = {
  email: string
  password: string
}

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean

  login: (params: LoginParams) => Promise<void>
  logout: () => void
  hydrateFromStorage: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: getAuthToken(),
  user: getStoredUser<User>(),
  isAuthenticated: Boolean(getAuthToken()),

  hydrateFromStorage: () => {
    const token = getAuthToken()
    const user = getStoredUser<User>()
    set({ token, user, isAuthenticated: Boolean(token) })
  },

  login: async ({ email, password }) => {
    // FastAPI OAuth2PasswordRequestForm espera x-www-form-urlencoded con username/password.
    // En nuestro caso, usamos el email como "username" (y en backend lo aceptamos como email o username).
    const body = new URLSearchParams({
      username: email,
      password,
    })

    const tokenRes = await api.post<TokenResponse>("/auth/login", body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    const token = tokenRes.data.access_token
    setAuthToken(token)
    set({ token, isAuthenticated: true })

    // Con token ya persistido, el interceptor lo adjunta automáticamente.
    const meRes = await api.get<User>("/users/me")
    setStoredUser(meRes.data)
    set({ user: meRes.data })
  },

  logout: () => {
    clearAuthStorage()
    set({ token: null, user: null, isAuthenticated: false })
  },
}))

const TOKEN_KEY = "vm.auth.token"
const USER_KEY = "vm.auth.user"

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setAuthToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearAuthToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function getStoredUser<TUser = unknown>(): TUser | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as TUser
  } catch {
    return null
  }
}

export function setStoredUser<TUser = unknown>(user: TUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearStoredUser(): void {
  localStorage.removeItem(USER_KEY)
}

export function clearAuthStorage(): void {
  clearAuthToken()
  clearStoredUser()
}

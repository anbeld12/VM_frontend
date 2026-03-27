export interface News {
  id: string;
  source: string;
  title: string;
  original_url: string;
  published_date: string;
  scraped_date: string;
  content?: string;
}

export interface PendingNewsResponse {
  news: News[];
  total: number;
  page: number;
  size: number;
}

// --- Auth ---
export interface TokenResponse {
  access_token: string
  token_type: string
}

export type UserRole = "ADMIN" | "INVESTIGADOR" | "REVISOR" | "TECNICO" | "LECTOR"

export interface User {
  id: number
  username: string
  email: string
  nombre_completo: string
  role: UserRole
  is_active: boolean
  ultimo_login?: string | null
  created_at: string
}

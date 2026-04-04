import { createContext, useContext, useState } from 'react'

export interface User {
  id: string
  email: string
  full_name: string
  is_verified: boolean
  profile_picture: string | null
}

export interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  adminLogin: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

const defaultUser: User = {
  id: '1',
  email: 'admin@finspark.com',
  full_name: 'Administrator',
  is_verified: true,
  profile_picture: null,
}

const AuthContext = createContext<AuthContextType>({
  user: defaultUser,
  token: 'mock-token',
  isAuthenticated: true,
  isLoading: false,
  error: null,
  adminLogin: async () => {},
  login: async () => {},
  logout: async () => {},
  clearError: () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    return {
      user: defaultUser,
      token: 'mock-token',
      isAuthenticated: true,
      isLoading: false,
      error: null,
      adminLogin: async () => {},
      login: async () => {},
      logout: async () => {},
      clearError: () => {},
    }
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(defaultUser)
  const [token, setToken] = useState<string | null>('mock-token')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const adminLogin = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      // Call backend auth API
      const response = await fetch('http://127.0.0.1:8001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Login failed')
      }

      const data = await response.json()
      setToken(data.token)
      setUser({
        id: data.user.id,
        email: data.user.email,
        full_name: data.user.full_name || email.split('@')[0],
        is_verified: data.user.is_verified,
        profile_picture: data.user.profile_picture,
      })
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('auth_user', JSON.stringify(data.user))
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Login failed'
      setError(errorMsg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    await adminLogin(email, password)
  }

  const logout = async () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        error,
        adminLogin,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


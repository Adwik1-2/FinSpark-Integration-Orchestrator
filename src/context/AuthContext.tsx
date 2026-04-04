import { createContext, useContext } from 'react'

export interface User {
  id: string
  email: string
  full_name: string
  is_verified: boolean
  profile_picture: string | null
}

export interface AuthContextType {
  user: User
  token: string
  isAuthenticated: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: {
    id: '1',
    email: 'admin@finspark.com',
    full_name: 'Administrator',
    is_verified: true,
    profile_picture: null,
  },
  token: 'mock-token',
  isAuthenticated: true,
  logout: async () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    return {
      user: {
        id: '1',
        email: 'admin@finspark.com',
        full_name: 'Administrator',
        is_verified: true,
        profile_picture: null,
      },
      token: 'mock-token',
      isAuthenticated: true,
      logout: async () => {},
    }
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: '1',
          email: 'admin@finspark.com',
          full_name: 'Administrator',
          is_verified: true,
          profile_picture: null,
        },
        token: 'mock-token',
        isAuthenticated: true,
        logout: async () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

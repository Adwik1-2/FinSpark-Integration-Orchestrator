import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Chrome, Shield } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  useEffect(() => {
    // Clear any errors on mount
    const clearStorage = () => {
      localStorage.removeItem('auth_error')
    }
    clearStorage()
  }, [])

  const handleGoogleLogin = async () => {
    // Direct login - set mock Google user and redirect
    const mockUser = {
      id: 'google-user-123',
      email: 'admin@finspark.com',
      full_name: 'Administrator',
      is_verified: true,
      profile_picture: null,
    }
    
    const mockToken = 'google-oauth-token-' + Date.now()
    
    // Set user and token
    setUser(mockUser, mockToken)
    
    // Store in localStorage
    localStorage.setItem('auth_token', mockToken)
    localStorage.setItem('auth_user', JSON.stringify(mockUser))
    
    // Redirect to dashboard
    setTimeout(() => navigate('/dashboard'), 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-br from-blue-600 to-cyan-500 p-3 rounded-lg mb-4">
            <h1 className="text-3xl font-bold text-white">FS</h1>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">FinSpark</h1>
          <p className="text-slate-400 mb-2">Financial API Integration Platform</p>
          <p className="text-slate-500 text-sm">Admin Dashboard</p>
        </div>

        <div className="bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-800 p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-3">
              <Shield className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Admin Access</h2>
            <p className="text-slate-400 text-sm">Sign in with Google to continue</p>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-lg transition-colors"
          >
            <Chrome className="w-5 h-5" />
            Sign in with Google
          </button>

          <div className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg">
            <p className="text-xs text-slate-400 text-center">
              🔐 Restricted admin area. Only authorized personnel should access this portal.
            </p>
          </div>
        </div>

        <div className="text-center mt-8 text-slate-500 text-sm">
          <p>© 2026 FinSpark. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

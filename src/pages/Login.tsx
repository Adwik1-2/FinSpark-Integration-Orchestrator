import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Chrome, AlertCircle, Shield, CheckCircle } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const { adminLogin, isLoading, error, clearError } = useAuth()
  const [message, setMessage] = useState('')
  const [localError, setLocalError] = useState('')

  useEffect(() => {
    // Clear any previous errors when component mounts
    clearError()
    setMessage('')
    setLocalError('')
  }, [clearError])

  const handleGoogleLogin = async () => {
    setLocalError('')
    setMessage('')
    
    try {
      setMessage('Connecting to Google OAuth...')
      await adminLogin('admin@finspark.com', 'Admin@123')
      setMessage('Authentication successful! Redirecting...')
      setTimeout(() => navigate('/dashboard'), 1000)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Authentication failed'
      setLocalError(errorMsg)
    }
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
            <p className="text-slate-400 text-sm">Sign in with your Google account</p>
          </div>

          {localError && (
            <div className="p-3 bg-red-950 border border-red-800 rounded-lg text-red-300 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{localError}</span>
            </div>
          )}

          {message && (
            <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
              message.includes('Authentication successful')
                ? 'bg-emerald-950 border border-emerald-800 text-emerald-300'
                : 'bg-blue-950 border border-blue-800 text-blue-300'
            }`}>
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{message}</span>
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-lg transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            <Chrome className="w-5 h-5" />
            {isLoading ? 'Connecting...' : 'Sign in with Google'}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900 text-slate-500">Or use demo account</span>
            </div>
          </div>

          <div className="p-4 bg-slate-800 border border-slate-700 rounded-lg space-y-2">
            <p className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <Shield className="w-3 h-3 text-cyan-400" />
              Demo Admin Credentials
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <p><span className="text-slate-500">Email:</span> admin@finspark.com</p>
              <p><span className="text-slate-500">Password:</span> Admin@123</p>
            </div>
            <p className="text-xs text-slate-500 italic mt-2">↑ Used above for demonstration</p>
          </div>

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

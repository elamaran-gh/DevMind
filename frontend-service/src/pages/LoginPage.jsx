import { useState } from 'react'
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { setUser } from "../store/slices/authSlice"
import api from "../api/axiosInstance"

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill all fields")
      return
    }
    try {
      setLoading(true)
      setError('')
      const response = await api.post('/auth/login', { email, password })
      dispatch(setUser(response.data.data.user))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md">

        <div className='mb-8'>
          <h1 className="text-2xl font-bold text-gray-900">DevMind</h1>
          <p className="text-gray-500 mt-1">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className='flex flex-col gap-4'>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='you@example.com'
              className='w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500'
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50'
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            Register
          </Link>
        </p>

        <p className="text-center text-sm text-gray-500 mt-3">
          <Link to="/" className="text-gray-400 hover:text-gray-600 hover:underline">
            ← Back to home
          </Link>
        </p>

      </div>
    </div>
  )
}

export default LoginPage
import { Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import { useAuthStore } from './store/auth'
import { logout as apiLogout } from './api/auth'

function Protected({ children }: { children: JSX.Element }) {
  const token = useAuthStore(s => s.accessToken)
  return token ? children : <Navigate to="/signin" replace />
}

export default function App() {
  const navigate = useNavigate()
  const { accessToken, clear } = useAuthStore()
  const isAuthed = !!accessToken

  const onLogout = async () => {
    try {
      const token = useAuthStore.getState().accessToken
      if (token) await apiLogout(token) // revoke refresh cookie on server
    } finally {
      clear()                           // clear client state
      navigate('/signin', { replace: true })
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border border-gray-300 rounded-2xl shadow-sm">
      <nav className="flex items-center gap-4 mb-6 text-blue-600">
        <Link to="/" className="hover:underline">Home</Link>

        {!isAuthed ? (
          <>
            <Link to="/signin" className="hover:underline">Sign In</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        ) : (
          <button
            onClick={onLogout}
            className="ml-auto px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            Logout
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Protected><Home/></Protected>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </div>
  )
}

import { Route, Routes, Navigate, Link } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import { useAuthStore } from './store/auth'

function Protected({ children }: { children: JSX.Element }) {
  const token = useAuthStore(s => s.accessToken)
  return token ? children : <Navigate to="/signin" replace />
}

export default function App() {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border border-gray-300 rounded-2xl shadow-sm">
      <nav className="flex gap-4 mb-6 text-blue-600">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/signin" className="hover:underline">Sign In</Link>
        <Link to="/signup" className="hover:underline">Sign Up</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Protected><Home/></Protected>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </div>
  )
}

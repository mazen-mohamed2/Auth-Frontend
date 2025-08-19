import { useEffect, useState } from 'react'
import { me, refresh, logout } from '../api/auth'
import { useAuthStore } from '../store/auth'

export default function Home() {
  const { user, accessToken, setAuth, clear } = useAuthStore()
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    const bootstrap = async () => {
      if (!accessToken) {
        const r = await refresh()
        if (r.accessToken) {
          setAuth(user, r.accessToken)
        } else {
          setMessage('Please sign in.')
          return
        }
      }
      const token = useAuthStore.getState().accessToken!
      try {
        const res = await me(token)
        setMessage(`Welcome to the application, ${res.user.name}.`)
      } catch {
        setMessage('Please sign in.')
      }
    }
    bootstrap()
  }, [])

  const doLogout = async () => {
    const token = useAuthStore.getState().accessToken
    if (token) await logout(token)
    clear()
    setMessage('Logged out.')
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{message}</h2>
      <button onClick={doLogout} className="px-4 py-2 rounded-xl border border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">Logout</button>
    </div>
  )
}

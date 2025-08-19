import { FormEvent, useState } from 'react'
import { signup } from '../api/auth'
import { useAuthStore } from '../store/auth'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
  const navigate = useNavigate()
  const setAuth = useAuthStore(s => s.setAuth)
  const [form, setForm] = useState({ email: '', name: '', password: '' })
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const data = await signup(form)
      setAuth(data.user, data.accessToken)
      navigate('/')
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Sign up failed')
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <h2 className="text-2xl font-semibold mb-2">Sign Up</h2>
      <label className="text-sm font-medium">Email</label>
      <input className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <label className="text-sm font-medium">Name</label>
      <input className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" required minLength={3} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <label className="text-sm font-medium">Password</label>
      <input className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" required minLength={8} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit" className="mt-2 px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-black transition-colors">Create account</button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  )
}

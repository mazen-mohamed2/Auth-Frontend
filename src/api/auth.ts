import api from './axios'

export async function signup(data: { email: string; name: string; password: string }) {
  const res = await api.post('/auth/signup', data)
  return res.data as { user: { id: string; email: string; name: string }, accessToken: string }
}

export async function signin(data: { email: string; password: string }) {
  const res = await api.post('/auth/signin', data)
  return res.data as { user: { id: string; email: string; name: string }, accessToken: string }
}

export async function refresh() {
  const res = await api.post('/auth/refresh')
  return res.data as { accessToken: string | null }
}

export async function me(token: string) {
  const res = await api.get('/users/me', { headers: { Authorization: `Bearer ${token}` }})
  return res.data
}

export async function logout(token: string) {
  const res = await api.post('/auth/logout', {}, { headers: { Authorization: `Bearer ${token}` }})
  return res.data
}

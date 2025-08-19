import { create } from 'zustand'

type User = { id: string; email: string; name: string } | null

type State = {
  user: User
  accessToken: string | null
  setAuth: (user: User, accessToken: string | null) => void
  clear: () => void
}

export const useAuthStore = create<State>((set) => ({
  user: null,
  accessToken: null,
  setAuth: (user, accessToken) => set({ user, accessToken }),
  clear: () => set({ user: null, accessToken: null })
}))

"use client"

import { create } from "zustand"

export interface User {
  id: string
  email: string
  name: string
}

interface AuthStore {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => void
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (email && password.length >= 6) {
      set({
        user: {
          id: "1",
          email,
          name: email.split("@")[0],
        },
      })
      localStorage.setItem(
        "auth_user",
        JSON.stringify({
          id: "1",
          email,
          name: email.split("@")[0],
        }),
      )
    } else {
      throw new Error("Invalid credentials")
    }
  },
  logout: () => {
    set({ user: null })
    localStorage.removeItem("auth_user")
  },
  checkAuth: () => {
    const stored = localStorage.getItem("auth_user")
    if (stored) {
      try {
        set({ user: JSON.parse(stored), isLoading: false })
      } catch {
        set({ isLoading: false })
      }
    } else {
      set({ isLoading: false })
    }
  },
}))

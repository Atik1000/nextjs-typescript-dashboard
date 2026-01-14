"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { LoginForm } from "@/components/auth/login-form"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function LoginPage() {
  const router = useRouter()
  const user = useAuth((state) => state.user)
  const isLoading = useAuth((state) => state.isLoading)
  const checkAuth = useAuth((state) => state.checkAuth)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div 
            className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"
            role="status"
            aria-label="Loading"
          />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <LoginForm />
    </main>
  )
}

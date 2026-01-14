"use client"

import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function DashboardHeader() {
  const user = useAuth((state) => state.user)
  const logout = useAuth((state) => state.logout)
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <header className="border-b bg-card">
      <div className="flex items-center justify-between h-16 px-6">
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome, {user?.name}</p>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout} 
            className="gap-2"
            aria-label="Logout from your account"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}

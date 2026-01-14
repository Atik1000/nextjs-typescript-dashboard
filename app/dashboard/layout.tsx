"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { KeyboardShortcutsHelp } from "@/components/ui/keyboard-shortcuts"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const user = useAuth((state) => state.user)
  const isLoading = useAuth((state) => state.isLoading)
  const checkAuth = useAuth((state) => state.checkAuth)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div 
            className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"
            role="status"
            aria-label="Loading dashboard"
          />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto" role="main" aria-label="Dashboard content">
          {children}
        </main>
      </div>
      <KeyboardShortcutsHelp />
    </div>
  )
}

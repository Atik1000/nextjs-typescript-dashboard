"use client"

import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/ui/theme-toggle"

interface NavbarProps {
  onMenuClick: () => void
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname()

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard"
    if (pathname === "/dashboard/settings") return "Settings"
    return "Dashboard"
  }

  return (
    <nav className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-muted rounded-lg transition-colors md:hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Toggle menu"
          aria-expanded="false"
        >
          <Menu size={20} aria-hidden="true" />
        </button>
        <h2 className="text-xl font-semibold text-foreground">{getPageTitle()}</h2>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div 
          className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold"
          role="img"
          aria-label="User avatar with initials JD"
        >
          JD
        </div>
      </div>
    </nav>
  )
}

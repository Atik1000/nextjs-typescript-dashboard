"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, Settings, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1" aria-label="Main dashboard navigation">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted",
            )}
            aria-current={isActive ? "page" : undefined}
            aria-label={`${item.label} page${isActive ? ' (current)' : ''}`}
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

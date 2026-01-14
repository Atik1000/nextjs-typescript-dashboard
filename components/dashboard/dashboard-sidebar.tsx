"use client"

import { DashboardNav } from "./dashboard-nav"

export function DashboardSidebar() {
  return (
    <aside 
      className="w-64 border-r bg-card hidden md:flex flex-col" 
      aria-label="Dashboard sidebar"
    >
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold"
            role="img"
            aria-label="Dashboard logo"
          >
            D
          </div>
          <h1 className="text-lg font-bold">Dashboard</h1>
        </div>
      </div>
      <nav className="flex-1 p-4 overflow-y-auto" role="navigation">
        <DashboardNav />
      </nav>
      
    </aside>
  )
}

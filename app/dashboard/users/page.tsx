"use client"

import { UsersTable } from "@/components/dashboard/users-table"

export default function UsersPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Users Management</h1>
        <p className="text-muted-foreground">View, search, and manage all users in your system</p>
      </div>
      <UsersTable />
    </div>
  )
}

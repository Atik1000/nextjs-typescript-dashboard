"use client"

import { useEffect, useMemo, useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { fetchUsers, type User } from "@/lib/api"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

const ITEMS_PER_PAGE = 10

const roleColors: Record<string, string> = {
  admin: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  user: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  viewer: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
}

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  inactive: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
}

function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 border rounded-lg">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-48 h-4" />
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-20 h-4" />
        </div>
      ))}
    </div>
  )
}

export function UsersTable() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [users, setUsers] = useState<User[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const search = searchParams.get("search") || ""
  const role = searchParams.get("role") || "all"
  const status = searchParams.get("status") || "all"
  const page = Number.parseInt(searchParams.get("page") || "1", 10)

  const debouncedSearch = useDebounce(search, 300)

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const result = await fetchUsers({
          search: debouncedSearch,
          role: role === "all" ? undefined : role,
          status: status === "all" ? undefined : status,
          page,
          limit: ITEMS_PER_PAGE,
        })
        setUsers(result.users)
        setTotal(result.total)
      } catch (err) {
        setError("Failed to load users")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadUsers()
  }, [debouncedSearch, role, status, page])

  const totalPages = useMemo(() => Math.ceil(total / ITEMS_PER_PAGE), [total])

  const handleSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set("search", value)
      params.set("page", "1")
      router.push(`?${params.toString()}`)
    },
    [searchParams, router],
  )

  const handleRoleChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set("role", value)
      params.set("page", "1")
      router.push(`?${params.toString()}`)
    },
    [searchParams, router],
  )

  const handleStatusChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set("status", value)
      params.set("page", "1")
      router.push(`?${params.toString()}`)
    },
    [searchParams, router],
  )

  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams)
      params.set("page", newPage.toString())
      router.push(`?${params.toString()}`)
    },
    [searchParams, router],
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>Manage and view all users in the system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-3">
          <div className="flex-1">
            <label htmlFor="search" className="text-sm font-medium mb-2 block">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
                aria-label="Search users"
              />
            </div>
          </div>

          <div>
            <label htmlFor="role-filter" className="text-sm font-medium mb-2 block">
              Role
            </label>
            <Select value={role} onValueChange={handleRoleChange}>
              <SelectTrigger id="role-filter" aria-label="Filter by role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="status-filter" className="text-sm font-medium mb-2 block">
              Status
            </label>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger id="status-filter" aria-label="Filter by status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
            {error}
          </div>
        )}

        {isLoading ? (
          <TableSkeleton />
        ) : users.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No users found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Role</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Join Date</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                      <td className="py-3 px-4">
                        <Badge className={roleColors[user.role] || ""} variant="secondary">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={statusColors[user.status] || ""} variant="secondary">
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{user.joinDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {(page - 1) * ITEMS_PER_PAGE + 1} to {Math.min(page * ITEMS_PER_PAGE, total)} of {total} users
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={page === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(i + 1)}
                    aria-current={page === i + 1 ? "page" : undefined}
                    aria-label={`Go to page ${i + 1}`}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

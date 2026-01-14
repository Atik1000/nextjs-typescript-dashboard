import { z } from "zod"

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["admin", "user", "viewer"]),
  status: z.enum(["active", "inactive", "pending"]),
  joinDate: z.string(),
})

export type User = z.infer<typeof userSchema>

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "admin",
    status: "active",
    joinDate: "2024-01-15",
  },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "user", status: "active", joinDate: "2024-02-20" },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol@example.com",
    role: "user",
    status: "inactive",
    joinDate: "2024-01-10",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david@example.com",
    role: "viewer",
    status: "pending",
    joinDate: "2024-03-05",
  },
  { id: "5", name: "Emma Davis", email: "emma@example.com", role: "admin", status: "active", joinDate: "2024-01-01" },
  { id: "6", name: "Frank Miller", email: "frank@example.com", role: "user", status: "active", joinDate: "2024-02-14" },
  { id: "7", name: "Grace Lee", email: "grace@example.com", role: "user", status: "active", joinDate: "2024-03-10" },
  {
    id: "8",
    name: "Henry Wilson",
    email: "henry@example.com",
    role: "viewer",
    status: "inactive",
    joinDate: "2024-01-20",
  },
  { id: "9", name: "Iris Chen", email: "iris@example.com", role: "user", status: "active", joinDate: "2024-02-28" },
  {
    id: "10",
    name: "Jack Martinez",
    email: "jack@example.com",
    role: "admin",
    status: "pending",
    joinDate: "2024-03-15",
  },
  {
    id: "11",
    name: "Karen Taylor",
    email: "karen@example.com",
    role: "user",
    status: "active",
    joinDate: "2024-02-05",
  },
  { id: "12", name: "Leo Anderson", email: "leo@example.com", role: "user", status: "active", joinDate: "2024-01-25" },
]

// Simulate API delays
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchUsers(params?: {
  search?: string
  role?: string
  status?: string
  page?: number
  limit?: number
}): Promise<{ users: User[]; total: number }> {
  await delay(600)

  let filtered = mockUsers

  if (params?.search) {
    const search = params.search.toLowerCase()
    filtered = filtered.filter((u) => u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search))
  }

  if (params?.role && params.role !== "all") {
    filtered = filtered.filter((u) => u.role === params.role)
  }

  if (params?.status && params.status !== "all") {
    filtered = filtered.filter((u) => u.status === params.status)
  }

  const page = params?.page || 1
  const limit = params?.limit || 10
  const start = (page - 1) * limit
  const paginated = filtered.slice(start, start + limit)

  return { users: paginated, total: filtered.length }
}

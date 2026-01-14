import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login"]

  // Check if user is trying to access protected routes
  if (!publicRoutes.includes(pathname) && pathname.startsWith("/dashboard")) {
    // In a real app, you'd check for a valid session/token here
    // For this demo, we rely on client-side auth check
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

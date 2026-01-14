import Link from "next/link"

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground">Welcome</h1>
        <p className="text-lg text-muted-foreground">Get started with the dashboard</p>
        <Link
          href="/login"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Go to Login
        </Link>
      </div>
    </main>
  )
}

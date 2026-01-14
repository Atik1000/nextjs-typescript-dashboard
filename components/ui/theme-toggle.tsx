'use client'

import * as React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        aria-label="Toggle theme"
        className="relative"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
      </Button>
    )
  }

  const currentTheme = theme === 'system' ? systemTheme : theme

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
    }
    if (currentTheme === 'dark') {
      return <Moon className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
    }
    return <Sun className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
  }

  const getLabel = () => {
    if (theme === 'system') {
      return `Current theme: system (${systemTheme}). Click to switch to light mode.`
    }
    if (currentTheme === 'dark') {
      return 'Current theme: dark. Click to switch to system preference.'
    }
    return 'Current theme: light. Click to switch to dark mode.'
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={cycleTheme}
      aria-label={getLabel()}
      title={getLabel()}
      className="relative"
    >
      {getIcon()}
      <span className="sr-only">{getLabel()}</span>
    </Button>
  )
}

export function ThemeToggleMenu() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      role="group"
      aria-label="Theme selection"
      className="flex flex-col gap-2"
    >
      <p className="text-sm font-medium mb-2">Theme</p>
      <div className="flex gap-2">
        <Button
          variant={theme === 'light' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTheme('light')}
          aria-pressed={theme === 'light'}
          aria-label="Light theme"
          className="flex-1"
        >
          <Sun className="h-4 w-4 mr-2" aria-hidden="true" />
          Light
        </Button>
        <Button
          variant={theme === 'dark' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTheme('dark')}
          aria-pressed={theme === 'dark'}
          aria-label="Dark theme"
          className="flex-1"
        >
          <Moon className="h-4 w-4 mr-2" aria-hidden="true" />
          Dark
        </Button>
        <Button
          variant={theme === 'system' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTheme('system')}
          aria-pressed={theme === 'system'}
          aria-label="System theme"
          className="flex-1"
        >
          <Monitor className="h-4 w-4 mr-2" aria-hidden="true" />
          System
        </Button>
      </div>
    </div>
  )
}

'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { X, Keyboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show keyboard shortcuts help with Shift + ?
      if (e.shiftKey && e.key === '?') {
        e.preventDefault()
        setIsOpen(true)
      }
      // Close with Escape
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        aria-label="Show keyboard shortcuts (Shift + ?)"
        title="Keyboard shortcuts"
        className="fixed bottom-4 right-4 z-50"
      >
        <Keyboard className="h-5 w-5" aria-hidden="true" />
      </Button>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-labelledby="shortcuts-title"
      aria-modal="true"
    >
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle id="shortcuts-title">Keyboard Shortcuts</CardTitle>
              <CardDescription>Navigate efficiently with these keyboard shortcuts</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close keyboard shortcuts"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
              General
            </h3>
            <div className="space-y-2">
              <ShortcutRow keys={['Shift', '?']} description="Show keyboard shortcuts" />
              <ShortcutRow keys={['Esc']} description="Close dialogs and modals" />
              <ShortcutRow keys={['Tab']} description="Move focus forward" />
              <ShortcutRow keys={['Shift', 'Tab']} description="Move focus backward" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
              Navigation
            </h3>
            <div className="space-y-2">
              <ShortcutRow keys={['/']} description="Focus search input" />
              <ShortcutRow keys={['Enter']} description="Activate focused element" />
              <ShortcutRow keys={['Space']} description="Select/toggle focused element" />
              <ShortcutRow keys={['Arrow Keys']} description="Navigate between items" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
              Theme
            </h3>
            <div className="space-y-2">
              <ShortcutRow keys={['Click Theme Toggle']} description="Cycle through light, dark, and system themes" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
              Accessibility
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• All interactive elements are keyboard accessible</p>
              <p>• Focus indicators are visible on all focusable elements</p>
              <p>• Screen readers are fully supported with ARIA labels</p>
              <p>• Dark mode respects system preferences by default</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ShortcutRow({ keys, description }: { keys: string[]; description: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-foreground">{description}</span>
      <div className="flex gap-1" role="presentation">
        {keys.map((key, index) => (
          <React.Fragment key={index}>
            <kbd
              className="px-2 py-1 text-xs font-semibold bg-muted border border-border rounded"
              aria-label={key}
            >
              {key}
            </kbd>
            {index < keys.length - 1 && (
              <span className="text-muted-foreground mx-1" aria-hidden="true">
                +
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

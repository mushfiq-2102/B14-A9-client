"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

// Dark / light switch. The icon is chosen with CSS (dark:), so there is no hydration mismatch.
// next-themes saves the selected theme in localStorage.
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      aria-label="Toggle dark and light theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-panel text-ink transition-colors hover:border-line-strong"
    >
      <Sun aria-hidden className="hidden size-5 dark:block" />
      <Moon aria-hidden className="size-5 dark:hidden" />
    </button>
  )
}

"use client"

// Image for user supplied / remote URLs (imgbb, Google, direct links). A plain
// <img> is used on purpose: next/image would reject every host that is not
// listed in remotePatterns. Falls back to a placeholder tile if the URL fails.

import * as React from "react"
import { Tractor } from "lucide-react"
import { cn } from "@/lib/utils"

export function RemoteImage({
  src,
  alt,
  className,
  hideOnError = false,
}: {
  src?: string | null
  alt: string
  className?: string
  /** Render nothing (instead of the placeholder tile) when the image fails. */
  hideOnError?: boolean
}) {
  const [failed, setFailed] = React.useState(false)

  if (!src || failed) {
    if (hideOnError) return null
    return (
      <div
        aria-hidden
        className={cn(
          "flex items-center justify-center bg-panel text-ink-faint",
          className
        )}
      >
        <Tractor className="size-1/4" />
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      // An image can fail before React hydrates, so onError never fires for it.
      // Checking the finished-but-empty state on mount catches that case.
      ref={(img) => {
        if (img && img.complete && img.naturalWidth === 0) setFailed(true)
      }}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  )
}

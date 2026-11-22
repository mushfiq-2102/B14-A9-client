"use client"

import { TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"

// Global error page: shown when a route throws while rendering.
export default function ErrorPage({
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-4 text-center">
            <TriangleAlert aria-hidden className="size-12 text-[#F97316]" />
            <h1 className="page-title">Something went wrong</h1>
            <p className="max-w-md text-white/70">
                The page could not be loaded. Try again, and if the problem stays, come back in a few minutes.
            </p>
            <Button onClick={reset} className="btn-brand h-11 px-5">
                Try again
            </Button>
        </main>
    )
}

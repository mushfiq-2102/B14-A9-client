import { Tractor } from "lucide-react"

// Global loading page shown while a route is streaming in.
export default function Loading() {
    return (
        <div
            role="status"
            aria-label="Loading"
            className="flex min-h-svh flex-col items-center justify-center gap-4"
        >
            <span className="btn-brand flex size-14 animate-pulse items-center justify-center rounded-2xl">
                <Tractor aria-hidden className="size-8" />
            </span>
            <p className="text-sm text-ink-soft">Loading RentRig...</p>
        </div>
    )
}

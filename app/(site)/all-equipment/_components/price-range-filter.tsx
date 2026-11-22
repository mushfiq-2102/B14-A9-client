"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

// Min / max rental price. Written to the URL as minPrice and maxPrice.
export function PriceRangeFilter({
    defaultMin = "",
    defaultMax = "",
}: {
    defaultMin?: string
    defaultMax?: string
}) {
    const router = useRouter()
    const [min, setMin] = React.useState(defaultMin)
    const [max, setMax] = React.useState(defaultMax)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const params = new URLSearchParams(window.location.search)
        params.delete("page")
        if (min) params.set("minPrice", min)
        else params.delete("minPrice")
        if (max) params.set("maxPrice", max)
        else params.delete("maxPrice")
        router.push(`/all-equipment?${params.toString()}`)
    }

    const fieldClass =
        "surface-field h-10 w-full rounded-md px-3 text-sm text-ink outline-none placeholder:text-ink-faint"

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <h2 className="text-base font-semibold tracking-[-0.02em] text-ink">
                Price range
            </h2>
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    min={0}
                    value={min}
                    onChange={(event) => setMin(event.target.value)}
                    placeholder="Min"
                    aria-label="Minimum price"
                    className={fieldClass}
                />
                <span aria-hidden className="text-ink-faint">-</span>
                <input
                    type="number"
                    min={0}
                    value={max}
                    onChange={(event) => setMax(event.target.value)}
                    placeholder="Max"
                    aria-label="Maximum price"
                    className={fieldClass}
                />
            </div>
            <button
                type="submit"
                className="h-10 rounded-md border border-line bg-panel text-sm font-medium text-ink transition-colors hover:border-[#F97316]/60"
            >
                Apply price
            </button>
        </form>
    )
}

"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"

// Search by equipment name, location or category. The query goes to the
// URL, the server page then asks the API to filter.
export function EquipmentSearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [value, setValue] = React.useState(searchParams.get("search") ?? "")

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const params = new URLSearchParams(window.location.search)
        if (value.trim()) {
            params.set("search", value.trim())
        } else {
            params.delete("search")
        }
        router.push(`/all-equipment?${params.toString()}`)
    }

    return (
        <form onSubmit={handleSubmit} role="search" className="flex w-full gap-3">
            <div className="relative flex-1">
                <Search
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-white/50"
                />
                <input
                    type="search"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    placeholder="Search by name, location or category"
                    aria-label="Search equipment"
                    className="surface-field h-12 w-full rounded-lg pl-10 pr-3 text-base text-[#EDEDEF] outline-none placeholder:text-white/50"
                />
            </div>
            <button type="submit" className="btn-brand h-12 rounded-lg px-6 text-base font-semibold">
                Search
            </button>
        </form>
    )
}

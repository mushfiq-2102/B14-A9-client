import { Suspense } from "react"

import { EquipmentCard } from "@/components/shared/equipment-card"
import { getEquipment } from "@/lib/api/equipment"

import { EquipmentFiltersPanel } from "./_components/equipment-filters-panel"
import { EquipmentSearchBar } from "./_components/equipment-search-bar"

const FILTER_KEYS = ["search", "category", "rentalType", "availability", "minPrice", "maxPrice", "sort"]

export default async function AllEquipmentPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | undefined>>
}) {
    const params = await searchParams

    // Search, filters and sorting run on the server (Express + MongoDB).
    const query = new URLSearchParams()
    for (const key of FILTER_KEYS) {
        if (params[key]) query.set(key, params[key])
    }
    const items = await getEquipment(query.toString())

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
            <header className="mb-8 flex flex-col gap-2">
                <h1 className="page-title">All equipment</h1>
                <p className="text-sm text-white/60">
                    Browse approved equipment from verified owners.
                </p>
            </header>

            <Suspense fallback={null}>
                <EquipmentSearchBar />
            </Suspense>

            <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
                <EquipmentFiltersPanel params={params} />

                <section aria-label="Equipment results">
                    <p className="mb-4 text-sm text-[#A0A0AB]">
                        {items.length} {items.length === 1 ? "item" : "items"} found
                    </p>

                    {items.length === 0 ? (
                        <p className="surface-card p-10 text-center text-sm text-[#6E6E78]">
                            No equipment matches your search. Try different filters.
                        </p>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {items.map((item) => (
                                <EquipmentCard key={item._id} item={item} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

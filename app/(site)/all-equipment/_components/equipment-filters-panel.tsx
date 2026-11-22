import Link from "next/link"

import { FilterChecklist, type FilterOption } from "@/components/shared/filter-checklist"
import { EQUIPMENT_CATEGORIES, RENTAL_TYPES } from "@/lib/types/equipment"
import { PriceRangeFilter } from "./price-range-filter"

const BASE_PATH = "/all-equipment"

const CATEGORY_OPTIONS: FilterOption[] = [
    { value: "", label: "All categories" },
    ...EQUIPMENT_CATEGORIES.map((category) => ({ value: category, label: category })),
]

const RENTAL_TYPE_OPTIONS: FilterOption[] = [
    { value: "", label: "All" },
    ...RENTAL_TYPES.map((type) => ({ value: type, label: type })),
]

const AVAILABILITY_OPTIONS: FilterOption[] = [
    { value: "", label: "All" },
    { value: "available", label: "Available" },
    { value: "unavailable", label: "Unavailable" },
]

const SORT_OPTIONS: FilterOption[] = [
    { value: "recent", label: "Recently added" },
    { value: "price-asc", label: "Price: low to high" },
    { value: "price-desc", label: "Price: high to low" },
]

export function EquipmentFiltersPanel({
    params,
}: {
    params: Record<string, string | undefined>
}) {
    return (
        <aside
            aria-label="Filters"
            className="surface-card flex h-fit flex-col gap-6 p-5 lg:sticky lg:top-28"
        >
            <div className="flex items-center justify-between">
                <h2 className="font-heading text-lg font-semibold text-strong">Filters</h2>
                <Link href={BASE_PATH} className="text-sm text-accent-ink hover:text-strong">
                    Clear all
                </Link>
            </div>

            <FilterChecklist
                legend="Sort by"
                name="sort"
                basePath={BASE_PATH}
                options={SORT_OPTIONS}
                defaultValue={params.sort ?? "recent"}
            />
            <FilterChecklist
                legend="Category"
                name="category"
                basePath={BASE_PATH}
                options={CATEGORY_OPTIONS}
                defaultValue={params.category ?? ""}
            />
            <FilterChecklist
                legend="Rental type"
                name="rentalType"
                basePath={BASE_PATH}
                options={RENTAL_TYPE_OPTIONS}
                defaultValue={params.rentalType ?? ""}
            />
            <FilterChecklist
                legend="Availability"
                name="availability"
                basePath={BASE_PATH}
                options={AVAILABILITY_OPTIONS}
                defaultValue={params.availability ?? ""}
            />
            <PriceRangeFilter
                key={`${params.minPrice}-${params.maxPrice}`}
                defaultMin={params.minPrice}
                defaultMax={params.maxPrice}
            />
        </aside>
    )
}

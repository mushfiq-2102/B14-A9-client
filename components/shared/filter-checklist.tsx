// Option list used by the All Equipment sidebar filters ("Category",
// "Rental Type"…). Radio inputs are visually hidden (sr-only) and drawn as checkbox-style tiles.
//
// Choosing an option writes it to the URL query string (the page is a server
// component that asks the Express API to filter). An option with an empty
// value ("All") clears the filter.
'use client'
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

export type FilterOption = {
    value: string
    label: string
}

export function FilterChecklist({
    legend,
    name,
    options,
    basePath,
    defaultValue = "",
}: {
    legend: string
    /** Query param key. */
    name: string
    options: readonly FilterOption[]
    /** Page the filter navigates to, e.g. "/all-equipment". */
    basePath: string
    /** Option value selected on first render (from the URL). */
    defaultValue?: string
}) {
    const router = useRouter()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(window.location.search)
        params.delete("page")
        if (event.target.value) {
            params.set(name, event.target.value)
        } else {
            params.delete(name)
        }

        router.push(`${basePath}?${params.toString()}`)
    }

    return (
        <fieldset className="flex flex-col gap-2">
            <legend className="text-base font-semibold tracking-[-0.02em] text-ink">
                {legend}
            </legend>
            <div className="flex flex-col gap-1">
                {options.map((option) => (
                    <label
                        key={option.value}
                        className="flex cursor-pointer items-center gap-3 py-1 text-[13px] font-medium text-ink-soft transition-colors capitalize hover:text-ink has-[:checked]:text-ink"
                    >
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            onChange={handleInputChange}
                            defaultChecked={defaultValue === option.value}
                            className="sr-only peer"
                        />
                        <span
                            aria-hidden
                            className="pointer-events-none flex size-5 shrink-0 items-center justify-center rounded-[4px] border border-line bg-panel text-transparent transition-colors peer-checked:border-[#F97316] peer-checked:bg-[#F97316] peer-checked:text-[#1A0F05] peer-focus-visible:ring-2 peer-focus-visible:ring-[#F97316]/60"
                        >
                            <Check className="size-3" strokeWidth={3} />
                        </span>
                        <span className="truncate">{option.label}</span>
                    </label>
                ))}
            </div>
        </fieldset>
    )
}

// Stat tile for the dashboard analytics rows.

import type { LucideIcon } from "lucide-react"

export function StatCard({
    label,
    value,
    icon: Icon,
}: {
    label: string
    value: string
    icon: LucideIcon
}) {
    return (
        <div className="surface-card flex items-center gap-4 px-6 py-5">
            <span className="brand-chip flex size-11 shrink-0 items-center justify-center rounded-xl">
                <Icon aria-hidden className="size-5" />
            </span>
            <div className="min-w-0">
                <dt className="truncate text-[13px] text-[#A0A0AB]">{label}</dt>
                <dd className="mt-1 text-[26px] leading-8 font-semibold text-[#EDEDEF]">
                    {value}
                </dd>
            </div>
        </div>
    )
}

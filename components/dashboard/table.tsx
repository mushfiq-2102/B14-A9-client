// Shared table chrome for every dashboard table.

import { cn } from "@/lib/utils"

export const thClass = "px-4 py-3 text-left text-xs font-medium whitespace-nowrap text-[#A0A0AB]"
export const tdClass = "px-4 py-3 align-middle text-[13px] text-[#EDEDEF]"

export function TableShell({
    children,
    empty,
    className,
}: {
    children: React.ReactNode
    /** Message shown instead of the table when there are no rows. */
    empty?: string
    className?: string
}) {
    if (empty) {
        return <p className="surface-card p-10 text-center text-sm text-[#6E6E78]">{empty}</p>
    }
    return (
        <div className={cn("surface-card overflow-x-auto", className)}>
            <table className="w-full min-w-[720px] border-collapse">{children}</table>
        </div>
    )
}

export function THead({ columns }: { columns: string[] }) {
    return (
        <thead>
            <tr className="border-b border-white/10">
                {columns.map((column) => (
                    <th key={column} scope="col" className={thClass}>
                        {column}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

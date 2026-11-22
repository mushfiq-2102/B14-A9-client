// Page links for the paginated lists. Server component: every page is a normal
// link, so the current filters stay in the URL.

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

// 1 ... 4 5 6 ... 12
const getPageList = (page: number, totalPages: number): (number | "gap")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages = new Set([1, totalPages, page - 1, page, page + 1])
    const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b)
    const list: (number | "gap")[] = []
    sorted.forEach((p, i) => {
        if (i > 0 && p - sorted[i - 1] > 1) list.push("gap")
        list.push(p)
    })
    return list
}

export function Pagination({
    page,
    totalPages,
    basePath,
    params = {},
}: {
    page: number
    totalPages: number
    basePath: string
    /** Current query string values (filters), kept on every page link. */
    params?: Record<string, string | undefined>
}) {
    if (totalPages <= 1) return null

    const hrefFor = (target: number) => {
        const query = new URLSearchParams()
        for (const [key, value] of Object.entries(params)) {
            if (value && key !== "page") query.set(key, value)
        }
        if (target > 1) query.set("page", String(target))
        const text = query.toString()
        return text ? `${basePath}?${text}` : basePath
    }

    const itemClass =
        "flex h-10 min-w-10 items-center justify-center rounded-lg border border-line bg-panel px-3 text-sm text-ink transition-colors hover:border-line-strong"

    return (
        <nav aria-label="Pagination" className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {page > 1 ? (
                <Link href={hrefFor(page - 1)} aria-label="Previous page" className={itemClass}>
                    <ChevronLeft aria-hidden className="size-4" />
                </Link>
            ) : null}

            {getPageList(page, totalPages).map((item, index) =>
                item === "gap" ? (
                    <span key={`gap-${index}`} aria-hidden className="px-1 text-ink-faint">
                        ...
                    </span>
                ) : (
                    <Link
                        key={item}
                        href={hrefFor(item)}
                        aria-label={`Page ${item}`}
                        aria-current={item === page ? "page" : undefined}
                        className={cn(itemClass, item === page && "btn-brand border-transparent font-semibold")}
                    >
                        {item}
                    </Link>
                )
            )}

            {page < totalPages ? (
                <Link href={hrefFor(page + 1)} aria-label="Next page" className={itemClass}>
                    <ChevronRight aria-hidden className="size-4" />
                </Link>
            ) : null}
        </nav>
    )
}

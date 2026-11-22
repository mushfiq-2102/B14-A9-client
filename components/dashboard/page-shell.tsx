// Dashboard page shell — container, page header, and numbered section cards.
// Extracted from the layouts repeated across `dashboard/recruiter/*` pages.
// Server-component friendly (no hooks/state).

import { cn } from "@/lib/utils"

/** Content width: "narrow" (forms) | "wide" (tables/lists). */
export function PageContainer({
    width = "narrow",
    children,
}: {
    width?: "narrow" | "wide"
    children: React.ReactNode
}) {
    return (
        <div
            className={cn(
                "mx-auto w-full px-4 py-8",
                width === "wide" ? "max-w-6xl" : "max-w-3xl",
            )}
        >
            {children}
        </div>
    )
}

/** Title + subtitle, with an optional right-aligned action slot. */
export function PageHeader({
    title,
    subtitle,
    action,
}: {
    title: string
    subtitle: string
    /** Right side element (e.g. an "Add Equipment" Link). */
    action?: React.ReactNode
}) {
    return (
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-1.5">
                <h1 className="page-title">{title}</h1>
                <p className="text-sm text-white/60">{subtitle}</p>
            </div>
            {action}
        </header>
    )
}

/** Numbered brand bullet + heading + carded body ("1 Basic Information"). */
export function SectionCard({
    index,
    title,
    children,
    className,
}: {
    index: number
    title: string
    children: React.ReactNode
    className?: string
}) {
    return (
        <section className={cn("surface-card p-6", className)}>
            <h2 className="mb-6 flex items-center gap-3 font-heading text-lg font-semibold tracking-[-0.02em] text-white">
                <span className="brand-chip flex size-7 items-center justify-center rounded-lg text-sm font-semibold">
                    {index}
                </span>
                {title}
            </h2>
            {children}
        </section>
    )
}

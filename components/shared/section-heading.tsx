// Heading block used by every home page section so the style stays the same.

export function SectionHeading({
    title,
    subtitle,
}: {
    title: string
    subtitle: string
}) {
    return (
        <div className="mb-10 flex max-w-2xl flex-col gap-3">
            <h2 className="section-title">{title}</h2>
            <p className="text-base leading-[1.6] text-ink-soft">{subtitle}</p>
        </div>
    )
}

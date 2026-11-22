import { BadgeCheck, HandCoins, Handshake, Leaf } from "lucide-react"

import { SectionHeading } from "@/components/shared/section-heading"

const VALUES = [
    {
        title: "Fair prices",
        text: "Owners set clear daily, weekly or monthly rates, so you always know the total before you pay.",
        icon: HandCoins,
    },
    {
        title: "Verified listings",
        text: "Every piece of equipment is reviewed by an admin before it appears on the platform.",
        icon: BadgeCheck,
    },
    {
        title: "Trust between people",
        text: "Owners and customers see each other's details, so questions are answered before the rental starts.",
        icon: Handshake,
    },
    {
        title: "Less waste",
        text: "Sharing equipment that would sit idle means fewer purchases and more use from what already exists.",
        icon: Leaf,
    },
]

export const metadata = { title: "About Us | RentRig" }

export default function AboutPage() {
    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
            <header className="mb-12 flex max-w-3xl flex-col gap-4">
                <h1 className="section-title">About RentRig</h1>
                <p className="text-lg leading-[1.7] text-ink-soft">
                    RentRig is a rental marketplace for equipment. Owners list the tools, cameras,
                    vehicles and machines they are not using every day. Customers rent them for
                    exactly the period they need, and pay securely online.
                </p>
                <p className="text-base leading-[1.7] text-ink-soft">
                    We built it to make renting as easy as booking a room: search, pick your dates,
                    pay, and track the rental from your dashboard.
                </p>
            </header>

            <SectionHeading title="What we stand for" subtitle="The ideas behind every listing and booking." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {VALUES.map(({ title, text, icon: Icon }) => (
                    <div key={title} className="surface-card flex h-full flex-col gap-4 p-6">
                        <span className="brand-chip flex size-12 items-center justify-center rounded-xl">
                            <Icon aria-hidden className="size-6" />
                        </span>
                        <h2 className="font-heading text-lg font-semibold text-ink">{title}</h2>
                        <p className="text-sm leading-6 text-ink-soft">{text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

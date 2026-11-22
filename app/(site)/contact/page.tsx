import { Clock, Mail, MapPin, Phone } from "lucide-react"

import { SectionHeading } from "@/components/shared/section-heading"

const CONTACTS = [
    { title: "Email", value: "support@rentrig.com", href: "mailto:support@rentrig.com", icon: Mail },
    { title: "Phone", value: "+880 1234 567890", href: "tel:+8801234567890", icon: Phone },
    { title: "Office", value: "Dhaka, Bangladesh", icon: MapPin },
    { title: "Support hours", value: "Sat to Thu, 9:00 AM to 6:00 PM", icon: Clock },
]

export const metadata = { title: "Contact Us | RentRig" }

export default function ContactPage() {
    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
            <SectionHeading
                title="Contact us"
                subtitle="Questions about a booking, a listing or your account? Reach the RentRig team here."
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {CONTACTS.map(({ title, value, href, icon: Icon }) => (
                    <div key={title} className="surface-card flex h-full flex-col gap-4 p-6">
                        <span className="brand-chip flex size-12 items-center justify-center rounded-xl">
                            <Icon aria-hidden className="size-6" />
                        </span>
                        <h2 className="font-heading text-lg font-semibold text-ink">{title}</h2>
                        {href ? (
                            <a href={href} className="text-sm text-accent-ink transition-colors hover:text-strong">
                                {value}
                            </a>
                        ) : (
                            <p className="text-sm text-ink-soft">{value}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

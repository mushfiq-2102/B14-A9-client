import { BadgeDollarSign, CalendarClock, Lock, ShieldCheck } from "lucide-react"

import { SectionHeading } from "@/components/shared/section-heading"

const BENEFITS = [
  {
    title: "Affordable rental prices",
    text: "Pay for the days you need instead of buying equipment you will use once.",
    icon: BadgeDollarSign,
  },
  {
    title: "Verified equipment owners",
    text: "Every listing is reviewed and approved by our team before it goes live.",
    icon: ShieldCheck,
  },
  {
    title: "Flexible rental periods",
    text: "Choose daily, weekly or monthly rates and set your own start and end dates.",
    icon: CalendarClock,
  },
  {
    title: "Secure payments",
    text: "Checkout runs on Stripe, so your card details never touch our servers.",
    icon: Lock,
  },
]

export function WhyChooseUs() {
  return (
    <section className="mx-auto mt-24 w-full max-w-7xl px-4 sm:px-6">
      <SectionHeading
        title="Why choose RentRig"
        subtitle="A transparent marketplace where renting is as simple as booking a room."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map(({ title, text, icon: Icon }) => (
          <div key={title} className="surface-card flex h-full flex-col gap-4 p-6">
            <span className="brand-chip flex size-12 items-center justify-center rounded-xl">
              <Icon aria-hidden className="size-6" />
            </span>
            <h3 className="font-heading text-lg font-semibold text-[#EDEDEF]">{title}</h3>
            <p className="text-sm leading-6 text-[#A0A0AB]">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

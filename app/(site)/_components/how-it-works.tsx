"use client"

import { motion } from "framer-motion"

import { SectionHeading } from "@/components/shared/section-heading"
import { fadeInUp, staggerContainer } from "@/lib/motion"

// This content is a real sequence, so the steps are numbered.
const STEPS = [
  { title: "Find your equipment", text: "Search by name or location and filter by category, price and availability." },
  { title: "Pick your dates", text: "Choose the rental period and quantity. The total is calculated for you." },
  { title: "Pay with Stripe", text: "Confirm the booking and complete a secure card payment." },
  { title: "Collect and return", text: "Track the rental from your dashboard until it is completed." },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto mt-24 w-full max-w-7xl scroll-mt-28 px-4 sm:px-6">
      <motion.div {...fadeInUp}>
        <SectionHeading
          title="How it works"
          subtitle="From search to pickup in four steps."
        />
      </motion.div>

      <motion.ol
        {...staggerContainer}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {STEPS.map((step, index) => (
          <motion.li
            key={step.title}
            {...fadeInUp}
            className="surface-card flex h-full flex-col gap-3 p-6"
          >
            <span className="brand-chip flex size-9 items-center justify-center rounded-lg text-base font-semibold">
              {index + 1}
            </span>
            <h3 className="font-heading text-lg font-semibold text-ink">{step.title}</h3>
            <p className="text-sm leading-6 text-ink-soft">{step.text}</p>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  )
}

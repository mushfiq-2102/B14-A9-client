"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { buttonVariants } from "@/components/ui/button"
import { EquipmentCard } from "@/components/shared/equipment-card"
import { SectionHeading } from "@/components/shared/section-heading"
import { fadeInUp, staggerContainer } from "@/lib/motion"
import type { EquipmentRow } from "@/lib/types/equipment"
import { cn } from "@/lib/utils"

// Up to 6 approved equipment items (the server applies the limit).
export function FeaturedEquipment({ items }: { items: EquipmentRow[] }) {
  return (
    <section className="mx-auto mt-24 w-full max-w-7xl px-4 sm:px-6">
      <motion.div {...fadeInUp} className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          title="Featured equipment"
          subtitle="Approved listings from verified owners, ready to book for your dates."
        />
        <Link
          href="/all-equipment"
          className={cn(buttonVariants({ variant: "outline" }), "mb-10 h-10 px-4")}
        >
          View all equipment
        </Link>
      </motion.div>

      {items.length === 0 ? (
        <p className="surface-card p-10 text-center text-sm text-ink-faint">
          No equipment has been approved yet. Check back soon.
        </p>
      ) : (
        <motion.div
          {...staggerContainer}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <motion.div key={item._id} {...fadeInUp} className="h-full">
              <EquipmentCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  )
}

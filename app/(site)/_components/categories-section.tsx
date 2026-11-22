"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Camera, Cpu, HardHat, PartyPopper, Tractor, Truck } from "lucide-react"

import { SectionHeading } from "@/components/shared/section-heading"
import { fadeInUp, staggerContainer } from "@/lib/motion"

const CATEGORIES = [
  { name: "Construction Equipment", note: "Excavators, drills, scaffolding", icon: HardHat },
  { name: "Photography Equipment", note: "Cameras, lenses, lighting", icon: Camera },
  { name: "Vehicles & Transportation", note: "Vans, trucks, trailers", icon: Truck },
  { name: "Agriculture Equipment", note: "Tractors, sprayers, tillers", icon: Tractor },
  { name: "Electronics", note: "Laptops, projectors, drones", icon: Cpu },
  { name: "Event Equipment", note: "Tents, sound, staging", icon: PartyPopper },
]

export function CategoriesSection() {
  return (
    <section className="mx-auto mt-24 w-full max-w-7xl px-4 sm:px-6">
      <motion.div {...fadeInUp}>
        <SectionHeading
          title="Popular categories"
          subtitle="Start with the type of equipment your project needs."
        />
      </motion.div>

      <motion.div
        {...staggerContainer}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {CATEGORIES.map(({ name, note, icon: Icon }) => (
          <motion.div
            key={name}
            {...fadeInUp}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-full"
          >
            <Link
              href={`/all-equipment?category=${encodeURIComponent(name)}`}
              className="surface-card flex h-full items-center gap-4 p-6 transition-colors hover:border-[#F97316]/50"
            >
              <span className="brand-chip flex size-14 shrink-0 items-center justify-center rounded-xl">
                <Icon aria-hidden className="size-7" />
              </span>
              <span className="flex min-w-0 flex-col gap-1">
                <span className="font-heading text-lg font-semibold text-[#EDEDEF]">
                  {name}
                </span>
                <span className="text-sm text-[#A0A0AB]">{note}</span>
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

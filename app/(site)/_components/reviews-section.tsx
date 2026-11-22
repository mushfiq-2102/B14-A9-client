"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

import { SectionHeading } from "@/components/shared/section-heading"
import { fadeInUp, staggerContainer } from "@/lib/motion"

const REVIEWS = [
  {
    name: "Marcus Bell",
    rating: 5,
    comment:
      "Rented a mini excavator for a weekend landscaping job. Pickup was on time and the owner walked me through the controls.",
  },
  {
    name: "Aisha Rahman",
    rating: 5,
    comment:
      "Booked two cameras and a lighting kit for a wedding shoot. The weekly rate saved me hundreds compared to buying.",
  },
  {
    name: "Tomas Herrera",
    rating: 4,
    comment:
      "Clear pricing and easy checkout. I could see the total before paying and the confirmation arrived instantly.",
  },
  {
    name: "Priya Nair",
    rating: 5,
    comment:
      "As an event planner I rent staging and sound here every month. Owners respond fast and the gear is always in good shape.",
  },
]

export function ReviewsSection() {
  return (
    <section className="mx-auto mt-24 w-full max-w-7xl px-4 sm:px-6">
      <motion.div {...fadeInUp}>
        <SectionHeading
          title="What our customers say"
          subtitle="Real rentals from people who booked through RentRig."
        />
      </motion.div>

      <motion.div
        {...staggerContainer}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {REVIEWS.map((review) => (
          <motion.figure
            key={review.name}
            {...fadeInUp}
            className="surface-card flex h-full flex-col gap-4 p-6"
          >
            <div
              role="img"
              aria-label={`${review.rating} out of 5 stars`}
              className="flex gap-1"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  aria-hidden
                  className={
                    index < review.rating
                      ? "size-4 fill-[#F97316] text-[#F97316]"
                      : "size-4 text-ink-faint"
                  }
                />
              ))}
            </div>
            <blockquote className="flex-1 text-sm leading-6 text-ink-2">
              {review.comment}
            </blockquote>
            <figcaption className="text-sm font-semibold text-ink">
              {review.name}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  )
}

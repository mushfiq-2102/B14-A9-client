"use client"

// Home banner: full-width photo with the headline and primary actions.
// The photo fades in on load; if the image URL fails the dark gradient stays.

import Link from "next/link"
import { motion } from "framer-motion"

import { buttonVariants } from "@/components/ui/button"
import { RemoteImage } from "@/components/shared/remote-image"
import { cn } from "@/lib/utils"
import { HeroArt } from "./hero-art"

const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1800&q=80"

export function HeroBanner() {
  return (
    <section className="mx-auto mt-6 w-full max-w-7xl px-4 sm:px-6">
      <div className="relative isolate flex min-h-[560px] items-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1B1208] via-[#12100E] to-[#0B0D10]">
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <RemoteImage
            src={BANNER_IMAGE}
            alt=""
            hideOnError
            className="size-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-[#0B0D10] via-[#0B0D10]/80 to-[#0B0D10]/10"
          />
        </motion.div>

        <div className="grid w-full items-center gap-8 px-6 py-14 sm:px-12 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex max-w-2xl flex-col gap-6">
          <motion.h1
            className="font-heading text-[40px] leading-[1.1] font-bold tracking-[-0.02em] text-white md:text-[60px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Rent the equipment. Skip the purchase.
          </motion.h1>

          <motion.p
            className="max-w-xl text-lg leading-[1.6] text-[#EDEDEF]/80"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            RentRig matches you with verified owners of construction tools,
            cameras, vehicles, farm machinery and event gear. Pick your dates,
            pay securely and get the job done.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/all-equipment"
              className={cn(buttonVariants(), "btn-brand h-12 px-6 text-base font-semibold")}
            >
              Browse Equipment
            </Link>
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 border-white/20 bg-white/5 px-6 text-base text-white hover:bg-white/10"
              )}
            >
              Rent Out Your Gear
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroArt />
          <motion.span
            className="absolute top-6 left-0 rounded-xl border border-white/15 bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Verified owners
          </motion.span>
          <motion.span
            className="absolute right-2 bottom-10 rounded-xl border border-white/15 bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            Daily, weekly or monthly
          </motion.span>
        </motion.div>
        </div>
      </div>
    </section>
  )
}

import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Second extra section: invites equipment owners to list their gear.
export function OwnerCta() {
  return (
    <section className="mx-auto mt-24 w-full max-w-7xl px-4 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-[#F97316]/30 bg-gradient-to-br from-[#2A1707] to-[#101010] p-8 md:flex-row md:items-center md:p-12">
        <div className="flex max-w-xl flex-col gap-3">
          <h2 className="section-title text-white!">Got equipment sitting idle?</h2>
          <p className="text-base leading-[1.6] text-[#EDEDEF]/75">
            List it on RentRig, set your own rental price and earn every time a
            customer books. Our team reviews each listing before it goes live.
          </p>
        </div>
        <Link
          href="/sign-up"
          className={cn(buttonVariants(), "btn-brand h-12 shrink-0 px-6 text-base font-semibold")}
        >
          Become an owner
        </Link>
      </div>
    </section>
  )
}

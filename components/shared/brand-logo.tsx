// RentRig logo: icon tile + site name. Same size everywhere it is used
// (navbar, auth pages, footer, dashboard sidebar).

import Link from "next/link"
import { Tractor } from "lucide-react"

export function BrandLogo() {
  return (
    <Link
      href="/"
      aria-label="RentRig home"
      className="flex shrink-0 items-center gap-2.5"
    >
      <span className="btn-brand flex size-10 items-center justify-center rounded-xl">
        <Tractor aria-hidden className="size-6" />
      </span>
      <span className="font-heading text-2xl font-bold tracking-[-0.02em] text-white">
        RentRig
      </span>
    </Link>
  )
}

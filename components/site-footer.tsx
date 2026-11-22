import Link from "next/link"
import { Mail } from "lucide-react"

import { BrandLogo } from "@/components/shared/brand-logo"

// The new X logo (not the old Twitter bird).
function XLogo({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const FOOTER_LINKS = [
  {
    title: "Customers",
    links: [
      { label: "All Equipment", href: "/all-equipment" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "My Rentals", href: "/dashboard/customer/my-rentals" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Owners",
    links: [
      { label: "List Equipment", href: "/dashboard/owner/add-equipment" },
      { label: "My Equipment", href: "/dashboard/owner/my-equipment" },
      { label: "Rental Requests", href: "/dashboard/owner/my-equipment-rental" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-deep">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <BrandLogo />
          <p className="max-w-sm text-sm leading-6 text-ink-soft">
            RentRig connects equipment owners with customers who need gear for a
            day, a week or a month. Verified owners, clear prices, secure
            payments.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="RentRig on X"
              className="flex size-10 items-center justify-center rounded-lg border border-line bg-panel text-ink transition-colors hover:border-[#F97316]/60 hover:text-accent-ink"
            >
              <XLogo className="size-4" />
            </a>
            <a
              href="mailto:support@rentrig.com"
              aria-label="Email RentRig"
              className="flex size-10 items-center justify-center rounded-lg border border-line bg-panel text-ink transition-colors hover:border-[#F97316]/60 hover:text-accent-ink"
            >
              <Mail aria-hidden className="size-4" />
            </a>
          </div>
        </div>

        {FOOTER_LINKS.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="text-base font-semibold text-ink">{group.title}</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-soft transition-colors hover:text-strong"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-line px-4 py-5 text-center text-sm text-ink-faint">
        © 2026 RentRig. All rights reserved.
      </div>
    </footer>
  )
}

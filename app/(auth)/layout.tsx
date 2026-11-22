import type { ReactNode } from "react"

import { BrandLogo } from "@/components/shared/brand-logo"

// Shared shell for the sign-in / sign-up pages: dark canvas with the brand
// orange glow behind a centered auth card. Pages inside this group render the
// card contents only.
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-svh overflow-hidden bg-deep text-strong">
      {/* Ambient orange glow behind the card */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 h-[560px] w-[min(980px,150vw)] max-w-none -translate-x-1/2 -translate-y-1/2 [background:radial-gradient(closest-side,rgba(249,115,22,0.28)_0%,rgba(249,115,22,0.10)_48%,transparent_78%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-lg flex-col items-center px-4 py-6 sm:px-6">
        <BrandLogo />

        <main className="mt-10 flex w-full flex-1 flex-col justify-center pb-10 sm:justify-start">
          {children}
        </main>
      </div>
    </div>
  )
}

import Link from "next/link"
import { SearchX } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
    return (
        <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-4 text-center">
            <SearchX aria-hidden className="size-12 text-[#F97316]" />
            <h1 className="page-title">404 - Page not found</h1>
            <p className="max-w-md text-white/70">
                The page you are looking for does not exist or the equipment is no longer listed.
            </p>
            <Link href="/all-equipment" className={cn(buttonVariants(), "btn-brand h-11 px-5")}>
                Browse equipment
            </Link>
        </main>
    )
}

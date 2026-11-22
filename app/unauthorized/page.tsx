import Link from "next/link"
import { ShieldAlert } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function UnauthorizedPage() {
    return (
        <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-4 text-center">
            <ShieldAlert aria-hidden className="size-12 text-[#F97316]" />
            <h1 className="page-title">Unauthorized</h1>
            <p className="max-w-md text-white/70">
                You do not have permission to view this page. Sign in with the right account or head back home.
            </p>
            <Link href="/" className={cn(buttonVariants(), "btn-brand h-11 px-5")}>
                Back to home
            </Link>
        </main>
    )
}

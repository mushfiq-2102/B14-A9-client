import { requireRole } from "@/lib/core/server"

// Only owners may open the pages under /dashboard/owner.
export default async function OwnerLayout({ children }: { children: React.ReactNode }) {
    await requireRole("owner")
    return <>{children}</>
}

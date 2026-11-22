import { requireRole } from "@/lib/core/server"

// Only customers may open the pages under /dashboard/customer.
export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
    await requireRole("customer")
    return <>{children}</>
}

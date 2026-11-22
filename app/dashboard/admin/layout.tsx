import { requireRole } from "@/lib/core/server"

// Only admins may open the pages under /dashboard/admin.
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    await requireRole("admin")
    return <>{children}</>
}

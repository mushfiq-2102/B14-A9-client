import { redirect } from "next/navigation"

import { ThemeToggle } from "@/components/shared/theme-toggle"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { getSession } from "@/lib/core/server"
import type { UserRole } from "@/lib/types/users"
import { DashboardSidebar } from "../components/DashboardSidebar"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    // Private routes: a logged in user keeps the session on reload, logged out users go to login.
    const session = await getSession()
    if (!session) {
        redirect("/sign-in")
    }

    return (
        <SidebarProvider>
            <DashboardSidebar
                user={{
                    name: session.user.name,
                    image: session.user.image,
                    role: (session.user.role as UserRole) || "customer",
                }}
            />
            <main className="min-w-0 flex-1">
                <div className="flex items-center justify-between px-3 pt-3 sm:px-6">
                    <SidebarTrigger />
                    <ThemeToggle />
                </div>
                {children}
            </main>
        </SidebarProvider>
    )
};

export default DashboardLayout;

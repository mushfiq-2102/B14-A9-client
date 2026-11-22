import { redirect } from "next/navigation"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { getSession } from "@/lib/core/server"
import { DashboardSidebar } from "../components/DashboardSidebar"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    // Private routes: a logged in user keeps the session on reload, logged out users go to login.
    const session = await getSession()
    if (!session) {
        redirect("/sign-in")
    }

    return (
        <SidebarProvider>
            <DashboardSidebar></DashboardSidebar>
            <main className="min-w-0 flex-1">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
};

export default DashboardLayout;

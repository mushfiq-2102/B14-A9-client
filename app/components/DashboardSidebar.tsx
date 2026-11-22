"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import { ROLE_META, type UserRole } from "@/lib/types/users"
import { UserAvatar } from "@/components/shared/user-avatar"
import { BrandLogo } from "@/components/shared/brand-logo"
import {
    CalendarClock,
    CirclePlus,
    CircleUserRound,
    ClipboardList,
    Heart,
    Home,
    LayoutDashboard,
    Package,
    Users,
    type LucideIcon,
} from "lucide-react"
import Link from "next/link"

type MenuItem = {
    id: string
    name: string
    url: string
    icon: LucideIcon
}

// The Home link sits above the role menu and is shared by every role.
const homeItem: MenuItem = { id: "home", name: "Home", url: "/", icon: Home }

const menuItemsByRole: Record<UserRole, MenuItem[]> = {
    customer: [
        { id: "my-rentals", name: "My Rentals", url: "/dashboard/customer/my-rentals", icon: CalendarClock },
        { id: "favorites", name: "Favorites", url: "/dashboard/customer/favorites", icon: Heart },
        { id: "profile", name: "Profile", url: "/dashboard/customer/profile", icon: CircleUserRound },
    ],
    owner: [
        { id: "dashboard", name: "Dashboard", url: "/dashboard/owner", icon: LayoutDashboard },
        { id: "add-equipment", name: "Add Equipment", url: "/dashboard/owner/add-equipment", icon: CirclePlus },
        { id: "my-equipment", name: "My Equipment", url: "/dashboard/owner/my-equipment", icon: Package },
        { id: "my-equipment-rental", name: "My Equipment Rental", url: "/dashboard/owner/my-equipment-rental", icon: ClipboardList },
        { id: "profile", name: "My Profile", url: "/dashboard/owner/profile", icon: CircleUserRound },
    ],
    admin: [
        { id: "dashboard", name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
        { id: "users", name: "All Users", url: "/dashboard/admin/users", icon: Users },
        { id: "equipment", name: "All Equipment", url: "/dashboard/admin/equipment", icon: Package },
        { id: "rentals", name: "All Rentals", url: "/dashboard/admin/rentals", icon: ClipboardList },
        { id: "profile", name: "My Profile", url: "/dashboard/admin/profile", icon: CircleUserRound },
    ],
}


export function DashboardSidebar() {
    const { data: session, isPending } = useSession();
    const role: UserRole = session?.user?.role || 'customer';

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="px-2 pt-2 pb-1">
                    <BrandLogo />
                </div>
                {/* Signed-in user: avatar + name + role */}
                <div className="flex items-center gap-2.5 px-2 py-1.5">
                    <UserAvatar
                        src={session?.user?.image}
                        name={session?.user?.name}
                        className="size-9"
                    />
                    <div className="flex min-w-0 flex-col">
                        <span className="truncate text-sm font-medium text-[#EDEDEF]">
                            {isPending ? "…" : session?.user?.name}
                        </span>
                        <span className="truncate text-xs text-[#6E6E78]">
                            {ROLE_META[role].label}
                        </span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {/* Shared across all roles: back to the public site */}
                        <SidebarMenuItem key={homeItem.id}>
                            <SidebarMenuButton render={<Link href={homeItem.url} />}>
                                <homeItem.icon />
                                <span>{homeItem.name}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarMenu>
                        {menuItemsByRole[role].map((item) => (
                            <SidebarMenuItem key={item.id}>
                                <SidebarMenuButton render={<Link href={item.url} />}>
                                    <item.icon />
                                    <span>{item.name}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

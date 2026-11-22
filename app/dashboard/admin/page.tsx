import { Boxes, CalendarCheck, ClipboardList, Clock, Users, Wallet } from "lucide-react"

import { BarChartCard } from "@/components/dashboard/bar-chart-card"
import { PageContainer, PageHeader } from "@/components/dashboard/page-shell"
import { StatCard } from "@/components/dashboard/stat-card"
import { getAdminAnalytics } from "@/lib/api/analytics"
import { formatCurrency } from "@/lib/formatters"

export default async function AdminDashboardPage() {
    const analytics = await getAdminAnalytics()

    return (
        <PageContainer width="wide">
            <PageHeader title="Admin dashboard" subtitle="Platform performance at a glance." />

            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard label="Total users" value={String(analytics.totalUsers)} icon={Users} />
                <StatCard label="Total equipment" value={String(analytics.totalEquipment)} icon={Boxes} />
                <StatCard label="Total bookings" value={String(analytics.totalBookings)} icon={ClipboardList} />
                <StatCard label="Pending approvals" value={String(analytics.pendingApprovals)} icon={Clock} />
                <StatCard label="Completed rentals" value={String(analytics.completedRentals)} icon={CalendarCheck} />
                <StatCard label="Total revenue" value={formatCurrency(analytics.totalRevenue)} icon={Wallet} />
            </dl>

            <div className="mt-6">
                <BarChartCard
                    title="Monthly bookings"
                    subtitle="Number of bookings created each month."
                    data={analytics.monthlyBookings}
                    dataKey="bookings"
                />
            </div>
        </PageContainer>
    )
}

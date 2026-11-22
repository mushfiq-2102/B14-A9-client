import { Boxes, CalendarCheck, Wallet } from "lucide-react"

import { BarChartCard } from "@/components/dashboard/bar-chart-card"
import { PageContainer, PageHeader } from "@/components/dashboard/page-shell"
import { StatCard } from "@/components/dashboard/stat-card"
import { getOwnerAnalytics } from "@/lib/api/analytics"
import { formatCurrency } from "@/lib/formatters"

export default async function OwnerDashboardPage() {
    const analytics = await getOwnerAnalytics()

    return (
        <PageContainer width="wide">
            <PageHeader title="Owner dashboard" subtitle="Track your rental business at a glance." />

            <dl className="grid gap-4 sm:grid-cols-3">
                <StatCard label="Total listed equipment" value={String(analytics.totalEquipment)} icon={Boxes} />
                <StatCard label="Completed rentals" value={String(analytics.completedRentals)} icon={CalendarCheck} />
                <StatCard label="Total earnings" value={formatCurrency(analytics.totalEarnings)} icon={Wallet} />
            </dl>

            <div className="mt-6">
                <BarChartCard
                    title="Monthly earnings"
                    subtitle="Earnings from paid rentals, grouped by month."
                    data={analytics.monthlyEarnings}
                    dataKey="earnings"
                    valuePrefix="$"
                />
            </div>
        </PageContainer>
    )
}

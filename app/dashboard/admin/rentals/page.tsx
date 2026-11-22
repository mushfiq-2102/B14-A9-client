import { PageContainer, PageHeader } from "@/components/dashboard/page-shell"
import { ManageBookingsTable } from "@/components/dashboard/manage-bookings-table"
import { getAllBookings } from "@/lib/api/bookings"

export default async function AdminRentalsPage() {
    const bookings = await getAllBookings()

    return (
        <PageContainer width="wide">
            <PageHeader title="All rentals" subtitle="Monitor and manage every rental on the platform." />
            <ManageBookingsTable variant="admin" bookings={bookings} />
        </PageContainer>
    )
}

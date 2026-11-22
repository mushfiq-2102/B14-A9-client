import { PageContainer, PageHeader } from "@/components/dashboard/page-shell"
import { ManageBookingsTable } from "@/components/dashboard/manage-bookings-table"
import { getOwnerBookings } from "@/lib/api/bookings"

export default async function MyEquipmentRentalPage() {
    const bookings = await getOwnerBookings()

    return (
        <PageContainer width="wide">
            <PageHeader title="My equipment rental" subtitle="Bookings made on your equipment." />
            <ManageBookingsTable variant="owner" bookings={bookings} />
        </PageContainer>
    )
}

import Link from "next/link"

import { PageContainer, PageHeader } from "@/components/dashboard/page-shell"
import { TableShell, THead, tdClass } from "@/components/dashboard/table"
import { BookingStatusPill, PaymentStatusPill } from "@/components/shared/status-pills"
import { Pagination } from "@/components/shared/pagination"
import { buttonVariants } from "@/components/ui/button"
import { getMyBookings } from "@/lib/api/bookings"
import { formatCurrency, formatDate } from "@/lib/formatters"
import { cn } from "@/lib/utils"

export default async function MyRentalsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>
}) {
    // booking history, 10 rentals per page
    const page = Math.max(1, Number((await searchParams).page) || 1)
    const { items: bookings, total, limit } = await getMyBookings(`page=${page}&limit=10`)
    const totalPages = Math.ceil(total / limit)

    return (
        <PageContainer width="wide">
            <PageHeader
                title="My rentals"
                subtitle="Every equipment booking you have paid for."
                action={
                    <Link href="/all-equipment" className={cn(buttonVariants(), "btn-brand h-10 px-4")}>
                        Rent more equipment
                    </Link>
                }
            />

            <TableShell empty={total === 0 ? "You have no rentals yet. Browse equipment to make your first booking." : undefined}>
                <THead
                    columns={[
                        "Equipment name",
                        "Rental start date",
                        "Rental end date",
                        "Booking date",
                        "Total amount",
                        "Payment status",
                        "Booking status",
                    ]}
                />
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id} className="border-b border-white/5 last:border-0">
                            <td className={cn(tdClass, "font-medium")}>{booking.equipmentName}</td>
                            <td className={tdClass}>{formatDate(booking.startDate)}</td>
                            <td className={tdClass}>{formatDate(booking.endDate)}</td>
                            <td className={tdClass}>{formatDate(booking.bookingDate)}</td>
                            <td className={tdClass}>{formatCurrency(booking.totalAmount)}</td>
                            <td className={tdClass}><PaymentStatusPill status={booking.paymentStatus} /></td>
                            <td className={tdClass}><BookingStatusPill status={booking.bookingStatus} /></td>
                        </tr>
                    ))}
                </tbody>
            </TableShell>

            <Pagination page={page} totalPages={totalPages} basePath="/dashboard/customer/my-rentals" />
        </PageContainer>
    )
}

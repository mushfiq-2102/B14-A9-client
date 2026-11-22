"use client"

// Booking table for owners (their equipment) and admins (everything).
// Owners and admins can change the booking status.

import { useState } from "react"

import { TableShell, THead, tdClass } from "@/components/dashboard/table"
import { BookingStatusSelect } from "@/components/shared/booking-status-select"
import { PaymentStatusPill } from "@/components/shared/status-pills"
import { toast } from "@/components/ui/toast"
import { updateBookingStatus } from "@/lib/actions/bookings"
import { formatCurrency, formatDate } from "@/lib/formatters"
import type { BookingRow, BookingStatus } from "@/lib/types/bookings"
import { cn } from "@/lib/utils"

export function ManageBookingsTable({
    variant,
    bookings,
}: {
    variant: "owner" | "admin"
    bookings: BookingRow[]
}) {
    const [statuses, setStatuses] = useState<Record<string, BookingStatus>>(() =>
        Object.fromEntries(bookings.map((booking) => [booking._id, booking.bookingStatus])),
    )

    const handleStatusChange = async (id: string, status: BookingStatus) => {
        setStatuses((prev) => ({ ...prev, [id]: status }))
        const res = await updateBookingStatus(id, status)
        if (res.acknowledged) {
            toast.add({ title: "Booking status updated", type: "success" })
        }
    }

    const columns =
        variant === "owner"
            ? ["Customer information", "Equipment information", "Rental duration", "Required quantity", "Booking amount", "Payment status", "Booking status"]
            : ["Customer information", "Owner information", "Equipment name", "Rental duration", "Booking amount", "Payment status", "Booking status"]

    return (
        <TableShell empty={bookings.length === 0 ? "No rentals found." : undefined}>
            <THead columns={columns} />
            <tbody>
                {bookings.map((booking) => (
                    <tr key={booking._id} className="border-b border-line-soft last:border-0">
                        <td className={tdClass}>
                            <p className="font-medium">{booking.customerName}</p>
                            <p className="text-xs text-ink-soft">{booking.customerEmail}</p>
                            {variant === "owner" ? (
                                <p className="text-xs text-ink-soft">{booking.contactNumber}</p>
                            ) : null}
                        </td>
                        {variant === "owner" ? (
                            <td className={tdClass}>
                                <p className="font-medium">{booking.equipmentName}</p>
                                <p className="max-w-48 truncate text-xs text-ink-soft">{booking.deliveryAddress}</p>
                            </td>
                        ) : (
                            <>
                                <td className={tdClass}>
                                    <p className="font-medium">{booking.ownerName}</p>
                                    <p className="text-xs text-ink-soft">{booking.ownerEmail}</p>
                                </td>
                                <td className={cn(tdClass, "font-medium")}>{booking.equipmentName}</td>
                            </>
                        )}
                        <td className={tdClass}>
                            {formatDate(booking.startDate)} to {formatDate(booking.endDate)}
                        </td>
                        {variant === "owner" ? <td className={tdClass}>{booking.quantity}</td> : null}
                        <td className={tdClass}>{formatCurrency(booking.totalAmount)}</td>
                        <td className={tdClass}><PaymentStatusPill status={booking.paymentStatus} /></td>
                        <td className={tdClass}>
                            <BookingStatusSelect
                                value={statuses[booking._id] ?? booking.bookingStatus}
                                onChange={(status) => handleStatusChange(booking._id, status)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </TableShell>
    )
}

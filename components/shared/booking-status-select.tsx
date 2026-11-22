"use client"

// Native select for changing a booking's status. Rendering only — persistence
// is the caller's responsibility.

import { cn } from "@/lib/utils"
import { BOOKING_STATUSES, BOOKING_STATUS_META, type BookingStatus } from "@/lib/types/bookings"

export function BookingStatusSelect({
    value,
    onChange,
    className,
}: {
    value: BookingStatus
    onChange: (status: BookingStatus) => void
    className?: string
}) {
    return (
        <select
            aria-label="Update booking status"
            value={value}
            onChange={(event) => onChange(event.target.value as BookingStatus)}
            className={cn(
                "surface-field h-9 rounded-md px-2.5 text-[13px] text-[#EDEDEF]",
                className,
            )}
        >
            {BOOKING_STATUSES.map((status) => (
                <option key={status} value={status} className="bg-[#1A1A1F]">
                    {BOOKING_STATUS_META[status].label}
                </option>
            ))}
        </select>
    )
}

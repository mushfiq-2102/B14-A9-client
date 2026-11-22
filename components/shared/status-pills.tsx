// Domain pills — each one passes its palette metadata into the generic Pill.

import { Pill } from "@/components/shared/pill"
import { ROLE_META, type UserRole } from "@/lib/types/users"
import { EQUIPMENT_STATUS_META, type EquipmentStatus } from "@/lib/types/equipment"
import {
    BOOKING_STATUS_META,
    PAYMENT_STATUS_META,
    type BookingStatus,
    type PaymentStatus,
} from "@/lib/types/bookings"

export function RolePill({ role }: { role: UserRole }) {
    const { label, color } = ROLE_META[role]
    return <Pill label={label} color={color} dot />
}

export function EquipmentStatusPill({ status }: { status: EquipmentStatus }) {
    const { label, color } = EQUIPMENT_STATUS_META[status]
    return <Pill label={label} color={color} />
}

export function BookingStatusPill({ status }: { status: BookingStatus }) {
    const { label, color } = BOOKING_STATUS_META[status]
    return <Pill label={label} color={color} />
}

export function PaymentStatusPill({ status }: { status: PaymentStatus }) {
    const { label, color } = PAYMENT_STATUS_META[status]
    return <Pill label={label} color={color} />
}

export function AvailabilityPill({ available }: { available: boolean }) {
    return (
        <Pill
            label={available ? "Available" : "Unavailable"}
            color={available ? "#2DD4BF" : "#EF4444"}
            dot
        />
    )
}

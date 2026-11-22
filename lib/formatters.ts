// Display formatters shared between public pages and dashboard pages.

import { RENTAL_UNIT, type RentalType } from "@/lib/types/equipment"

const DAY = 24 * 60 * 60 * 1000
const UNIT_DAYS: Record<RentalType, number> = { daily: 1, weekly: 7, monthly: 30 }

/** 1200 → "$1,200". Fixed en-US so SSR and client agree. */
export const formatCurrency = (amount: number) =>
    amount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 })

/** 25, "daily" → "$25 / day". */
export const formatRate = (price: number, rentalType: RentalType) =>
    `${formatCurrency(price)} / ${RENTAL_UNIT[rentalType]}`

/** "2026-11-30" or ISO timestamp → "Nov 30, 2026". Fixed en-US so SSR and client agree. */
export const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric", timeZone: "UTC" })

/** "2026-11" → "Nov 2026". */
export const formatMonth = (month: string) =>
    new Date(`${month}-01T00:00:00Z`).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })

/**
 * Rental amount preview: rental units (days / weeks / months, rounded up) x price x quantity.
 * The server runs the same calculation, so this is only a preview.
 */
export const calculateRental = (
    price: number,
    rentalType: RentalType,
    startDate: string,
    endDate: string,
    quantity: number,
) => {
    const days = Math.floor((new Date(endDate).getTime() - new Date(startDate).getTime()) / DAY) + 1
    if (!startDate || !endDate || Number.isNaN(days) || days < 1 || quantity < 1) {
        return { days: 0, units: 0, totalAmount: 0 }
    }
    const units = Math.ceil(days / UNIT_DAYS[rentalType])
    return { days, units, totalAmount: units * price * quantity }
}

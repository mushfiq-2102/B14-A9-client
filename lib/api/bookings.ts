// Data-access module for the bookings API (Express on :5000).
'use server'
import type { BookingQuote, BookingRow } from "@/lib/types/bookings"
import type { Paginated } from "@/lib/types/pagination"
import { authFetch } from "@/lib/core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

// Customer: one page of the booking history of the logged in customer.
export const getMyBookings = async (query = ''): Promise<Paginated<BookingRow>> => {
    const res = await authFetch(`${BASE_URL}/bookings?${query}`)
    return res.json()
}

// Owner: bookings made on the logged in owner's equipment.
export const getOwnerBookings = async (): Promise<BookingRow[]> => {
    const res = await authFetch(`${BASE_URL}/bookings/owner`)
    return res.json()
}

// Admin: every booking on the platform.
export const getAllBookings = async (): Promise<BookingRow[]> => {
    const res = await authFetch(`${BASE_URL}/bookings/all`)
    return res.json()
}

// Calculates the rental amount and checks availability for the requested dates.
export const getBookingQuote = async (query: string): Promise<BookingQuote> => {
    const res = await authFetch(`${BASE_URL}/bookings/quote?${query}`)
    return res.json()
}

'use server'
import { protectedMutation } from "@/lib/core/server"
import type { BookingStatus } from "@/lib/types/bookings"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const updateBookingStatus = async (id: string, status: BookingStatus) => {
    const api = `${BASE_URL}/bookings/${id}/status`;
    const response = await protectedMutation(api, "PATCH", { status })
    return response.json()
}

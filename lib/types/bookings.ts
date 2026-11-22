// Shared booking domain types — used by the customer My Rentals page, the owner
// My Equipment Rental page and the admin All Rentals page.
//
// A booking is created only after Stripe confirms the payment, and it stores a
// snapshot of the equipment, customer and owner so tables need no joins.

export type BookingStatus = "confirmed" | "completed" | "cancelled"
export type PaymentStatus = "paid" | "pending"

/** Status pill labels + palette. */
export const BOOKING_STATUS_META: Record<BookingStatus, { label: string; color: string }> = {
    confirmed: { label: "Confirmed", color: "#60A5FA" },
    completed: { label: "Completed", color: "#22C55E" },
    cancelled: { label: "Cancelled", color: "#EF4444" },
}

export const PAYMENT_STATUS_META: Record<PaymentStatus, { label: string; color: string }> = {
    paid: { label: "Paid", color: "#22C55E" },
    pending: { label: "Pending", color: "#F59E0B" },
}

/** All selectable booking statuses. */
export const BOOKING_STATUSES = Object.keys(BOOKING_STATUS_META) as BookingStatus[]

export type BookingRow = {
    _id: string
    equipmentId: string
    equipmentName: string
    equipmentImage: string
    customerId: string
    customerName: string
    customerEmail: string
    ownerId: string
    ownerName: string
    ownerEmail: string
    /** "YYYY-MM-DD" */
    startDate: string
    endDate: string
    quantity: number
    contactNumber: string
    deliveryAddress: string
    notes: string
    totalAmount: number
    /** ISO timestamp */
    bookingDate: string
    paymentStatus: PaymentStatus
    bookingStatus: BookingStatus
    transactionId: string
}

// Response of GET /bookings/quote — either the calculated quote or an error message.
export type BookingQuote =
    | {
          available: boolean
          remaining: number
          days: number
          units: number
          totalAmount: number
          equipmentName: string
          rentalType: string
          rentalPrice: number
      }
    | { message: string }

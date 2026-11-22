import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { getBookingQuote } from "@/lib/api/bookings"
import { requireRole } from "@/lib/core/server"
import { formatCurrency, formatDate, formatRate } from "@/lib/formatters"
import type { RentalType } from "@/lib/types/equipment"
import { cn } from "@/lib/utils"

// Payment page: shows the booking summary (amount calculated by the server)
// and posts to the Stripe checkout route.
export default async function PaymentPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | undefined>>
}) {
    await requireRole("customer")

    const params = await searchParams
    const { equipmentId = "", startDate = "", endDate = "", quantity = "1" } = params
    const contactNumber = params.contactNumber ?? ""
    const deliveryAddress = params.deliveryAddress ?? ""
    const notes = params.notes ?? ""

    const quote = await getBookingQuote(
        new URLSearchParams({ equipmentId, startDate, endDate, quantity }).toString(),
    )

    if ("message" in quote || !quote.available) {
        return (
            <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
                <h1 className="page-title">Booking unavailable</h1>
                <p className="text-white/70">
                    {"message" in quote
                        ? quote.message
                        : "This equipment is not available for the selected dates."}
                </p>
                <Link
                    href={equipmentId ? `/equipment/${equipmentId}` : "/all-equipment"}
                    className={cn(buttonVariants(), "btn-brand h-11 px-5")}
                >
                    Change booking
                </Link>
            </div>
        )
    }

    const rows = [
        { label: "Equipment", value: quote.equipmentName },
        { label: "Rental period", value: `${formatDate(startDate)} to ${formatDate(endDate)}` },
        { label: "Duration", value: `${quote.days} day(s), billed as ${quote.units} ${quote.rentalType} unit(s)` },
        { label: "Rate", value: formatRate(quote.rentalPrice, quote.rentalType as RentalType) },
        { label: "Quantity", value: quantity },
        { label: "Contact number", value: contactNumber },
        { label: "Delivery address", value: deliveryAddress },
    ]

    return (
        <div className="mx-auto w-full max-w-2xl px-4 py-12">
            <header className="mb-8 flex flex-col gap-2">
                <h1 className="page-title">Payment</h1>
                <p className="text-sm text-white/60">
                    Review your booking, then pay securely with Stripe.
                </p>
            </header>

            <section className="surface-card p-6">
                <dl className="flex flex-col gap-4">
                    {rows.map((row) => (
                        <div key={row.label} className="flex justify-between gap-6 text-sm">
                            <dt className="text-[#A0A0AB]">{row.label}</dt>
                            <dd className="text-right font-medium text-[#EDEDEF]">{row.value}</dd>
                        </div>
                    ))}
                    <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-4">
                        <dt className="text-base text-[#EDEDEF]">Total amount</dt>
                        <dd className="text-2xl font-semibold text-white">{formatCurrency(quote.totalAmount)}</dd>
                    </div>
                </dl>

                <form action="/api/checkout_sessions" method="POST" className="mt-6">
                    <input type="hidden" name="equipmentId" value={equipmentId} />
                    <input type="hidden" name="startDate" value={startDate} />
                    <input type="hidden" name="endDate" value={endDate} />
                    <input type="hidden" name="quantity" value={quantity} />
                    <input type="hidden" name="contactNumber" value={contactNumber} />
                    <input type="hidden" name="deliveryAddress" value={deliveryAddress} />
                    <input type="hidden" name="notes" value={notes} />
                    <button
                        type="submit"
                        className="btn-brand h-12 w-full rounded-lg text-base font-semibold"
                    >
                        Pay {formatCurrency(quote.totalAmount)} with Stripe
                    </button>
                </form>
            </section>
        </div>
    )
}

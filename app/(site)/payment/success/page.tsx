import Link from "next/link"
import { redirect } from "next/navigation"
import { CircleAlert, CircleCheck } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { checkoutVerify } from "@/lib/actions/payments"
import { requireRole } from "@/lib/core/server"
import { formatCurrency, formatDate } from "@/lib/formatters"
import { stripe } from "@/lib/stripe"
import { cn } from "@/lib/utils"

export default async function PaymentSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>
}) {
    await requireRole("customer")

    const { session_id } = await searchParams
    if (!session_id) {
        redirect("/")
    }

    const checkout = await stripe.checkout.sessions.retrieve(session_id)
    const paid = checkout.status === "complete" && checkout.payment_status === "paid"

    // Saves the payment and creates the booking record (once per session).
    const result = paid ? await checkoutVerify(session_id) : null
    const verified = Boolean(result?.success) || result?.message === "Payment already verified"

    if (!paid || !verified) {
        return (
            <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
                <CircleAlert aria-hidden className="size-12 text-[#F97316]" />
                <h1 className="page-title">Payment not completed</h1>
                <p className="text-ink-2">
                    {result?.message ?? "Your payment was not completed, so no booking was created."}
                </p>
                <Link href="/all-equipment" className={cn(buttonVariants(), "btn-brand h-11 px-5")}>
                    Back to equipment
                </Link>
            </div>
        )
    }

    const metadata = checkout.metadata ?? {}
    const rows = [
        { label: "Rental period", value: `${formatDate(metadata.startDate)} to ${formatDate(metadata.endDate)}` },
        { label: "Quantity", value: metadata.quantity },
        { label: "Amount paid", value: formatCurrency((checkout.amount_total ?? 0) / 100) },
        { label: "Email", value: checkout.customer_email ?? "-" },
    ]

    return (
        <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 px-4 py-20 text-center">
            <CircleCheck aria-hidden className="size-14 text-[#22C55E]" />
            <div className="flex flex-col gap-2">
                <h1 className="page-title">Payment successful</h1>
                <p className="text-ink-2">
                    Your booking is confirmed and saved to your rentals.
                </p>
            </div>

            <dl className="surface-card flex w-full flex-col gap-3 p-6 text-sm">
                {rows.map((row) => (
                    <div key={row.label} className="flex justify-between gap-6">
                        <dt className="text-ink-soft">{row.label}</dt>
                        <dd className="font-medium text-ink">{row.value}</dd>
                    </div>
                ))}
            </dl>

            <Link
                href="/dashboard/customer/my-rentals"
                className={cn(buttonVariants(), "btn-brand h-11 px-5")}
            >
                View my rentals
            </Link>
        </div>
    )
}

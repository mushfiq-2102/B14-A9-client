import { NextRequest, NextResponse } from "next/server"

import { getBookingQuote } from "@/lib/api/bookings"
import { getSession } from "@/lib/core/server"
import { stripe } from "@/lib/stripe"

const field = (formData: FormData, name: string, max = 400) =>
    String(formData.get(name) ?? "").slice(0, max)

export async function POST(request: NextRequest) {
    const origin = request.nextUrl.origin

    const session = await getSession()
    if (!session) {
        return NextResponse.redirect(`${origin}/sign-in`, 303)
    }

    try {
        const formData = await request.formData()
        const equipmentId = field(formData, "equipmentId")
        const startDate = field(formData, "startDate")
        const endDate = field(formData, "endDate")
        const quantity = field(formData, "quantity")

        // The amount is calculated again on the server, never trusted from the form.
        const quote = await getBookingQuote(
            new URLSearchParams({ equipmentId, startDate, endDate, quantity }).toString(),
        )
        if ("message" in quote || !quote.available) {
            return NextResponse.redirect(`${origin}/equipment/${equipmentId}`, 303)
        }

        // Create Checkout Sessions from body params.
        const checkoutSession = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        unit_amount: Math.round(quote.totalAmount * 100),
                        product_data: {
                            name: `${quote.equipmentName} rental`,
                            description: `${startDate} to ${endDate}, quantity ${quantity}`,
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            customer_email: session.user.email,
            metadata: {
                userId: session.user.id,
                equipmentId,
                startDate,
                endDate,
                quantity,
                contactNumber: field(formData, "contactNumber"),
                deliveryAddress: field(formData, "deliveryAddress"),
                notes: field(formData, "notes"),
            },
            success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/equipment/${equipmentId}`,
        })

        return NextResponse.redirect(checkoutSession.url as string, 303)
    } catch (err) {
        const message = err instanceof Error ? err.message : "Checkout failed"
        const statusCode = (err as { statusCode?: number }).statusCode || 500
        return NextResponse.json({ error: message }, { status: statusCode })
    }
}

"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field } from "@/components/shared/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { getBookingQuote } from "@/lib/api/bookings"
import { calculateRental, formatCurrency } from "@/lib/formatters"
import type { EquipmentRow } from "@/lib/types/equipment"

export function BookEquipmentModal({ item }: { item: EquipmentRow }) {
    const router = useRouter()
    const [open, setOpen] = React.useState(false)
    const [submitting, setSubmitting] = React.useState(false)
    const [values, setValues] = React.useState({
        startDate: "",
        endDate: "",
        quantity: "1",
        contactNumber: "",
        deliveryAddress: "",
        notes: "",
    })

    const setField =
        (field: keyof typeof values) =>
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setValues((prev) => ({ ...prev, [field]: event.target.value }))

    const today = new Date().toISOString().slice(0, 10)
    const preview = calculateRental(
        item.rentalPrice,
        item.rentalType,
        values.startDate,
        values.endDate,
        Number(values.quantity),
    )

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSubmitting(true)

        const query = new URLSearchParams({
            equipmentId: item._id,
            startDate: values.startDate,
            endDate: values.endDate,
            quantity: values.quantity,
        })

        try {
            // The server calculates the amount and checks availability.
            const quote = await getBookingQuote(query.toString())

            if ("message" in quote) {
                toast.add({ title: "Booking failed", description: quote.message, type: "error" })
                return
            }
            if (!quote.available) {
                toast.add({
                    title: "Not available",
                    description: `Only ${Math.max(quote.remaining, 0)} unit(s) are free for those dates.`,
                    type: "error",
                })
                return
            }

            const paymentQuery = new URLSearchParams({
                equipmentId: item._id,
                startDate: values.startDate,
                endDate: values.endDate,
                quantity: values.quantity,
                contactNumber: values.contactNumber,
                deliveryAddress: values.deliveryAddress,
                notes: values.notes,
            })
            setOpen(false)
            router.push(`/payment?${paymentQuery.toString()}`)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={<Button className="btn-brand h-12 flex-1 text-base font-semibold" />}
                disabled={item.availableQuantity < 1}
            >
                Book Now
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Book {item.name}</DialogTitle>
                    <DialogDescription>
                        Choose your rental dates and delivery details. You will pay on the next step.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Rental start date" htmlFor="startDate">
                            <Input
                                id="startDate"
                                type="date"
                                required
                                min={today}
                                value={values.startDate}
                                onChange={setField("startDate")}
                                className="surface-field h-11"
                            />
                        </Field>
                        <Field label="Rental end date" htmlFor="endDate">
                            <Input
                                id="endDate"
                                type="date"
                                required
                                min={values.startDate || today}
                                value={values.endDate}
                                onChange={setField("endDate")}
                                className="surface-field h-11"
                            />
                        </Field>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Required quantity" htmlFor="quantity">
                            <Input
                                id="quantity"
                                type="number"
                                required
                                min={1}
                                max={item.availableQuantity}
                                value={values.quantity}
                                onChange={setField("quantity")}
                                className="surface-field h-11"
                            />
                        </Field>
                        <Field label="Contact number" htmlFor="contactNumber">
                            <Input
                                id="contactNumber"
                                type="tel"
                                required
                                value={values.contactNumber}
                                onChange={setField("contactNumber")}
                                placeholder="+1 555 0100"
                                className="surface-field h-11"
                            />
                        </Field>
                    </div>

                    <Field label="Delivery address" htmlFor="deliveryAddress">
                        <Input
                            id="deliveryAddress"
                            required
                            value={values.deliveryAddress}
                            onChange={setField("deliveryAddress")}
                            placeholder="Street, city"
                            className="surface-field h-11"
                        />
                    </Field>

                    <Field label="Additional notes" htmlFor="notes">
                        <Textarea
                            id="notes"
                            rows={3}
                            maxLength={300}
                            value={values.notes}
                            onChange={setField("notes")}
                            placeholder="Anything the owner should know"
                            className="surface-field"
                        />
                    </Field>

                    <div className="flex items-center justify-between rounded-lg border border-line bg-panel-2 px-4 py-3">
                        <span className="text-sm text-ink-soft">
                            {preview.units > 0
                                ? `${preview.days} day(s) = ${preview.units} ${item.rentalType} unit(s)`
                                : "Select dates to see the total"}
                        </span>
                        <span className="text-xl font-semibold text-strong">
                            {formatCurrency(preview.totalAmount)}
                        </span>
                    </div>

                    <Button
                        type="submit"
                        disabled={submitting}
                        className="btn-brand h-12 text-base font-semibold"
                    >
                        {submitting ? "Checking availability..." : "Confirm and continue to payment"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

import { notFound, redirect } from "next/navigation"
import { Mail, MapPin, Phone, UserRound } from "lucide-react"

import { RemoteImage } from "@/components/shared/remote-image"
import { AvailabilityPill } from "@/components/shared/status-pills"
import { getEquipmentById } from "@/lib/api/equipment"
import { getFavorites } from "@/lib/api/favorites"
import { getSession } from "@/lib/core/server"
import { formatRate } from "@/lib/formatters"
import { isAvailable } from "@/lib/types/equipment"

import { BookEquipmentModal } from "./_components/book-equipment-modal"
import { FavoriteButton } from "./_components/favorite-button"

export default async function EquipmentDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    // Private route: logged out visitors are sent to the login page.
    const session = await getSession()
    if (!session) {
        redirect(`/sign-in?redirectTo=/equipment/${id}`)
    }

    const item = await getEquipmentById(id)
    if (!item) notFound()

    const isCustomer = session.user.role === "customer"
    const favorites = isCustomer ? await getFavorites() : []
    const isFavorite = favorites.some((favorite) => favorite.equipmentId === id)

    const specs = [
        { label: "Category", value: item.category },
        { label: "Rental type", value: item.rentalType },
        { label: "Available quantity", value: String(item.availableQuantity) },
        { label: "Condition", value: item.condition },
        { label: "Brand", value: item.brand },
        { label: "Model", value: item.model },
    ]

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
                <div className="flex flex-col gap-6">
                    <RemoteImage
                        src={item.image}
                        alt={item.name}
                        className="aspect-[4/3] w-full rounded-2xl border border-line object-cover"
                    />

                    <section className="surface-card p-6">
                        <h2 className="mb-3 font-heading text-lg font-semibold text-strong">Description</h2>
                        <p className="text-sm leading-6 whitespace-pre-line text-ink-2">
                            {item.description}
                        </p>
                    </section>

                    <section className="surface-card p-6">
                        <h2 className="mb-3 font-heading text-lg font-semibold text-strong">
                            Rental terms and conditions
                        </h2>
                        <p className="text-sm leading-6 whitespace-pre-line text-ink-2">
                            {item.rentalTerms || "No special terms provided by the owner."}
                        </p>
                    </section>
                </div>

                <div className="flex flex-col gap-6">
                    <section className="surface-card flex flex-col gap-4 p-6">
                        <div className="flex items-center justify-between gap-3">
                            <span className="brand-chip rounded-full px-2.5 py-0.5 text-xs">
                                {item.category}
                            </span>
                            <AvailabilityPill available={isAvailable(item)} />
                        </div>
                        <h1 className="page-title">{item.name}</h1>
                        <p className="flex items-center gap-1.5 text-sm text-ink-soft">
                            <MapPin aria-hidden className="size-4" />
                            {item.location}
                        </p>
                        <p className="text-3xl font-semibold text-strong">
                            {formatRate(item.rentalPrice, item.rentalType)}
                        </p>

                        {isCustomer ? (
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <BookEquipmentModal item={item} />
                                <FavoriteButton equipmentId={item._id} isFavorite={isFavorite} />
                            </div>
                        ) : (
                            <p className="rounded-lg border border-line bg-panel-2 px-4 py-3 text-sm text-ink-soft">
                                Only customer accounts can book or save equipment.
                            </p>
                        )}
                    </section>

                    <section className="surface-card p-6">
                        <h2 className="mb-4 font-heading text-lg font-semibold text-strong">Equipment details</h2>
                        <dl className="grid grid-cols-2 gap-4">
                            {specs.map((spec) => (
                                <div key={spec.label}>
                                    <dt className="text-xs text-ink-faint">{spec.label}</dt>
                                    <dd className="mt-1 text-sm font-medium text-ink capitalize">
                                        {spec.value || "-"}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>

                    <section className="surface-card p-6">
                        <h2 className="mb-4 font-heading text-lg font-semibold text-strong">Owner information</h2>
                        <ul className="flex flex-col gap-3 text-sm text-ink-2">
                            <li className="flex items-center gap-2">
                                <UserRound aria-hidden className="size-4 text-ink-soft" />
                                {item.ownerName}
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail aria-hidden className="size-4 text-ink-soft" />
                                {item.ownerEmail}
                            </li>
                            {item.ownerPhone ? (
                                <li className="flex items-center gap-2">
                                    <Phone aria-hidden className="size-4 text-ink-soft" />
                                    {item.ownerPhone}
                                </li>
                            ) : null}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    )
}

// Equipment card shared by the home page (featured) and the All Equipment page.
// All cards have the same height: the image uses a fixed ratio and the button
// is pushed to the bottom.

import Link from "next/link"
import { MapPin } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { RemoteImage } from "@/components/shared/remote-image"
import { AvailabilityPill } from "@/components/shared/status-pills"
import { formatRate } from "@/lib/formatters"
import { isAvailable, type EquipmentRow } from "@/lib/types/equipment"
import { cn } from "@/lib/utils"

export function EquipmentCard({ item }: { item: EquipmentRow }) {
    return (
        <article className="surface-card flex h-full flex-col overflow-hidden">
            <RemoteImage
                src={item.image}
                alt={item.name}
                className="aspect-[4/3] w-full object-cover"
            />

            <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center justify-between gap-3">
                    <span className="brand-chip truncate rounded-full px-2.5 py-0.5 text-xs">
                        {item.category}
                    </span>
                    <AvailabilityPill available={isAvailable(item)} />
                </div>

                <h3 className="line-clamp-1 font-heading text-lg font-semibold text-ink">
                    {item.name}
                </h3>

                <p className="flex items-center gap-1.5 text-sm text-ink-soft">
                    <MapPin aria-hidden className="size-4 shrink-0" />
                    <span className="truncate">{item.location}</span>
                </p>

                <div className="mt-auto flex items-end justify-between gap-3 pt-2">
                    <div>
                        <p className="text-xl font-semibold text-strong">
                            {formatRate(item.rentalPrice, item.rentalType)}
                        </p>
                        <p className="text-xs text-ink-faint capitalize">
                            {item.rentalType} rental
                        </p>
                    </div>
                    <Link
                        href={`/equipment/${item._id}`}
                        className={cn(buttonVariants(), "btn-brand h-10 px-4")}
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </article>
    )
}

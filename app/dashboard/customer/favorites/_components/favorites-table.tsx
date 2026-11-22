"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"

import { TableShell, THead, tdClass } from "@/components/dashboard/table"
import { RemoteImage } from "@/components/shared/remote-image"
import { Button, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { removeFavorite } from "@/lib/api/favorites"
import { formatRate } from "@/lib/formatters"
import type { FavoriteRow } from "@/lib/types/favorites"
import { cn } from "@/lib/utils"

export function FavoritesTable({ favorites }: { favorites: FavoriteRow[] }) {
    const router = useRouter()

    const handleRemove = async (equipmentId: string) => {
        const res = await removeFavorite(equipmentId)
        if (res.deletedCount) {
            toast.add({ title: "Removed from favorites", type: "success" })
            router.refresh()
        }
    }

    return (
        <TableShell empty={favorites.length === 0 ? "No favorites yet. Save equipment from its details page." : undefined}>
            <THead columns={["Equipment", "Category", "Rental price", "Location", "Actions"]} />
            <tbody>
                {favorites.map((favorite) => (
                    <tr key={favorite._id} className="border-b border-line-soft last:border-0">
                        <td className={tdClass}>
                            <div className="flex items-center gap-3">
                                <RemoteImage src={favorite.image} alt={favorite.name} className="size-11 rounded-lg object-cover" />
                                <span className="font-medium">{favorite.name}</span>
                            </div>
                        </td>
                        <td className={tdClass}>{favorite.category}</td>
                        <td className={tdClass}>{formatRate(favorite.rentalPrice, favorite.rentalType)}</td>
                        <td className={tdClass}>{favorite.location}</td>
                        <td className={tdClass}>
                            <div className="flex items-center gap-2">
                                <Link
                                    href={`/equipment/${favorite.equipmentId}`}
                                    className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                                >
                                    View Details
                                </Link>
                                <Button variant="destructive" size="sm" onClick={() => handleRemove(favorite.equipmentId)}>
                                    <Heart aria-hidden />
                                    Remove Favorite
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </TableShell>
    )
}

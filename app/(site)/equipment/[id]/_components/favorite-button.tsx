"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { addFavorite, removeFavorite } from "@/lib/api/favorites"

export function FavoriteButton({
    equipmentId,
    isFavorite,
}: {
    equipmentId: string
    isFavorite: boolean
}) {
    const router = useRouter()
    const [pending, setPending] = React.useState(false)

    const handleToggle = async () => {
        setPending(true)
        try {
            if (isFavorite) {
                await removeFavorite(equipmentId)
                toast.add({ title: "Removed from favorites", type: "success" })
            } else {
                await addFavorite(equipmentId)
                toast.add({ title: "Added to favorites", type: "success" })
            }
            router.refresh()
        } finally {
            setPending(false)
        }
    }

    return (
        <Button
            variant="outline"
            disabled={pending}
            onClick={handleToggle}
            aria-pressed={isFavorite}
            className="h-12 flex-1 gap-2 text-base"
        >
            <Heart
                aria-hidden
                className={isFavorite ? "size-5 fill-[#F97316] text-[#F97316]" : "size-5"}
            />
            {isFavorite ? "Remove favorite" : "Add to favorites"}
        </Button>
    )
}

import type { RentalType } from "@/lib/types/equipment"

// Favorite = snapshot of the equipment at the time it was saved.
export type FavoriteRow = {
    _id: string
    userId: string
    equipmentId: string
    name: string
    image: string
    category: string
    rentalPrice: number
    rentalType: RentalType
    location: string
    createdAt: string
}

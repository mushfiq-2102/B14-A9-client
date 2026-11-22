// Shared equipment domain types + option lists — single source of truth for the
// add / update equipment form, the equipment tables, the cards and the API layer.

export type RentalType = "daily" | "weekly" | "monthly"
export type EquipmentStatus = "pending" | "approved" | "rejected"

export const EQUIPMENT_CATEGORIES = [
    "Construction Equipment",
    "Photography Equipment",
    "Vehicles & Transportation",
    "Agriculture Equipment",
    "Electronics",
    "Event Equipment",
]

export const RENTAL_TYPES: RentalType[] = ["daily", "weekly", "monthly"]

/** Label used in prices: "$25 / day". */
export const RENTAL_UNIT: Record<RentalType, string> = {
    daily: "day",
    weekly: "week",
    monthly: "month",
}

export const EQUIPMENT_CONDITIONS = ["new", "excellent", "good", "fair"]

/** Status pill labels + palette. */
export const EQUIPMENT_STATUS_META: Record<EquipmentStatus, { label: string; color: string }> = {
    pending: { label: "Pending", color: "#F59E0B" },
    approved: { label: "Approved", color: "#22C55E" },
    rejected: { label: "Rejected", color: "#EF4444" },
}

// Payload sent when an owner (or admin) creates / updates equipment.
export type EquipmentFormData = {
    name: string
    description: string
    category: string
    location: string
    rentalPrice: number
    rentalType: RentalType
    availableQuantity: number
    condition: string
    brand: string
    model: string
    image: string
    rentalTerms: string
}

// Saved document: payload + the fields the server adds.
export type EquipmentRow = EquipmentFormData & {
    _id: string
    status: EquipmentStatus
    ownerId: string
    ownerName: string
    ownerEmail: string
    ownerPhone: string
    createdAt: string
}

export const isAvailable = (item: Pick<EquipmentRow, "availableQuantity">) =>
    item.availableQuantity > 0

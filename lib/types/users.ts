// Shared user domain types — single source of truth for the admin All Users
// page, the profile page and the sidebar.
//
// Roles match the better-auth `role` additionalField configured in
// `lib/auth.ts` (["customer", "owner", "admin"]).

export type UserRole = "customer" | "owner" | "admin"

/** Role pill labels + palette. */
export const ROLE_META: Record<UserRole, { label: string; color: string }> = {
    customer: { label: "Customer", color: "#A1A4AA" },
    owner: { label: "Owner", color: "#2DD4BF" },
    admin: { label: "Admin", color: "#F97316" },
}

/** All roles, in privilege order. */
export const USER_ROLES = Object.keys(ROLE_META) as UserRole[]

// One row of the All Users table / the profile form (subset of the user document).
export type UserRow = {
    _id: string
    name: string
    email: string
    role: UserRole
    image?: string | null
    phone?: string
    address?: string
    /** Account creation timestamp (ISO string). */
    createdAt: string
    /** Set by an admin to suspend the account. */
    banned?: boolean
}

export type ProfileFormData = {
    name: string
    image: string
    phone: string
    address: string
}

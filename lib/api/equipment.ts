// Single data-access module for the equipment API (Express on :5000).
'use server'
import type { EquipmentFormData, EquipmentRow, EquipmentStatus } from "@/lib/types/equipment"
import type { Paginated } from "@/lib/types/pagination"
import { authFetch, protectedMutation } from "@/lib/core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

// Public: approved equipment, filtered / sorted by the server from the query string.
export const getEquipment = async (query = ''): Promise<EquipmentRow[]> => {
    const res = await fetch(`${BASE_URL}/equipment?${query}`, { cache: "no-store" })
    return res.json()
}

// Public: one page of approved equipment (query holds the filters plus page and limit).
export const getEquipmentPage = async (query = ''): Promise<Paginated<EquipmentRow>> => {
    const res = await fetch(`${BASE_URL}/equipment?${query}`, { cache: "no-store" })
    return res.json()
}

// Private: returns null when the equipment does not exist or is not visible to the user.
export const getEquipmentById = async (equipmentId: string): Promise<EquipmentRow | null> => {
    const res = await authFetch(`${BASE_URL}/equipment/${equipmentId}`)
    if (!res.ok) return null
    return res.json()
}

export const getOwnerEquipment = async (): Promise<EquipmentRow[]> => {
    const res = await authFetch(`${BASE_URL}/equipment/owner`)
    return res.json()
}

export const getAllEquipment = async (): Promise<EquipmentRow[]> => {
    const res = await authFetch(`${BASE_URL}/equipment/all`)
    return res.json()
}

export const createEquipment = async (data: EquipmentFormData) => {
    const api = `${BASE_URL}/equipment`;
    const res = await protectedMutation(api, "POST", data)
    return res.json()
}

export const updateEquipment = async (equipmentId: string, data: EquipmentFormData) => {
    const api = `${BASE_URL}/equipment/${equipmentId}`;
    const res = await protectedMutation(api, "PATCH", data)
    return res.json()
}

export const updateEquipmentStatus = async (equipmentId: string, status: EquipmentStatus) => {
    const api = `${BASE_URL}/equipment/${equipmentId}/status`;
    const res = await protectedMutation(api, "PATCH", { status })
    return res.json()
}

export const deleteEquipment = async (equipmentId: string) => {
    const api = `${BASE_URL}/equipment/${equipmentId}`;
    const res = await protectedMutation(api, "DELETE")
    return res.json()
}

// Data-access module for the favorites API (Express on :5000).
'use server'
import type { FavoriteRow } from "@/lib/types/favorites"
import { authFetch, protectedMutation } from "@/lib/core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getFavorites = async (): Promise<FavoriteRow[]> => {
    const res = await authFetch(`${BASE_URL}/favorites`)
    return res.json()
}

export const addFavorite = async (equipmentId: string) => {
    const api = `${BASE_URL}/favorites`;
    const res = await protectedMutation(api, "POST", { equipmentId })
    return res.json()
}

export const removeFavorite = async (equipmentId: string) => {
    const api = `${BASE_URL}/favorites/${equipmentId}`;
    const res = await protectedMutation(api, "DELETE")
    return res.json()
}

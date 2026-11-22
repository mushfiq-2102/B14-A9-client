'use server'
import { authFetch } from "../core/server"
import type { AdminAnalytics, OwnerAnalytics } from "@/lib/types/analytics"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getAdminAnalytics = async (): Promise<AdminAnalytics> => {
    const res = await authFetch(`${BASE_URL}/analytics/admin`)
    return res.json()
}

export const getOwnerAnalytics = async (): Promise<OwnerAnalytics> => {
    const res = await authFetch(`${BASE_URL}/analytics/owner`)
    return res.json()
}

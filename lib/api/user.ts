'use server'
import { authFetch } from "../core/server"
import type { UserRow } from "@/lib/types/users"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getUsers = async (): Promise<UserRow[]> => {
    const res = await authFetch(`${BASE_URL}/users`)
    return res.json()
}

export const getProfile = async (): Promise<UserRow> => {
    const res = await authFetch(`${BASE_URL}/profile`)
    return res.json()
}

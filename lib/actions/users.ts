'use server'
import { protectedMutation } from "@/lib/core/server"
import type { ProfileFormData, UserRole } from "@/lib/types/users"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const updateUserRole = async (userId: string, role: UserRole) => {
    const api = `${BASE_URL}/users/${userId}/role`;
    const response = await protectedMutation(api, "PATCH", { role })
    return response.json()
}

export const updateUserStatus = async (userId: string, banned: boolean) => {
    const api = `${BASE_URL}/users/${userId}/status`;
    const response = await protectedMutation(api, "PATCH", { banned })
    return response.json()
}

export const updateProfile = async (data: ProfileFormData) => {
    const api = `${BASE_URL}/profile`;
    const response = await protectedMutation(api, "PATCH", data)
    return response.json()
}

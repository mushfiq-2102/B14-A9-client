'use server'
import { protectedMutation } from "@/lib/core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const checkoutVerify = async (sessionId: string) => {
    const api = `${BASE_URL}/payments/checkout-verify`;
    const response = await protectedMutation(api, "POST", { sessionId })
    return response.json()
}

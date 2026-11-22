"use client"

import * as React from "react"
import { AuthForm, AuthFormData } from "@/components/auth-form"
import { toast } from "@/components/ui/toast"
import { authClient } from "@/lib/auth-client"
import { safeRedirectPath, withLoginFlag } from "@/lib/auth-redirect"
import { useRouter, useSearchParams } from "next/navigation"

export default function SignInContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirectTo = safeRedirectPath(searchParams.get("redirectTo"))
    const [error, setError] = React.useState<string | null>(null)

    const handleSignIn = async (data: AuthFormData) => {
        setError(null)

        const { error: signInError } = await authClient.signIn.email({
            email: data.email,
            password: data.password,
            rememberMe: true,
        })

        if (signInError) {
            setError(signInError.message || "Invalid email or password.")
            return
        }

        toast.add({
            title: "Login successful",
            description: "Welcome back to RentRig.",
            type: "success",
        })
        // Refresh so server components pick up the session cookie, then navigate.
        router.refresh()
        router.push(redirectTo)
    }

    const handleGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: withLoginFlag(redirectTo),
        })
    }

    return <AuthForm mode="signin" onSubmit={handleSignIn} onGoogle={handleGoogle} error={error} />
}

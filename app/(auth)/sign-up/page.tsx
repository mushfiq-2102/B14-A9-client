"use client"

import * as React from "react"

import { AuthForm, AuthFormData } from "@/components/auth-form"
import { toast } from "@/components/ui/toast"
import { authClient } from "@/lib/auth-client"
import { withLoginFlag } from "@/lib/auth-redirect"
import { useRouter } from 'next/navigation'

export default function SignUpPage() {

    const router = useRouter();
    const [error, setError] = React.useState<string | null>(null);

    const handleSignUp = async (data: AuthFormData) => {

        setError(null);

        const { error: signUpError } = await authClient.signUp.email({
            name: data.name as string,
            email: data.email,
            password: data.password,
            image: data.image || undefined,
        });

        if (signUpError) {
            // e.g. 422 "User already exists. Use another email."
            setError(signUpError.message || "Something went wrong. Please try again.");
            return;
        }

        toast.add({
            title: "Registration successful",
            description: "Your account is ready. Welcome to RentRig.",
            type: "success",
        })

        // Refresh so server components pick up the new session cookie, then navigate.
        router.refresh();
        router.push("/");
    }

    const handleGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: withLoginFlag("/"),
        })
    }

    return <AuthForm mode="signup" onSubmit={handleSignUp} onGoogle={handleGoogle} error={error} />
}

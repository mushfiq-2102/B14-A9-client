import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const getSession = async () => {
    "use server";
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session;
}

// JWT access token (signed by Better Auth) sent to the Express server as a Bearer token.
export const getToken = async () => {
    const session = await getSession();
    if (!session) {
        redirect("/unauthorized");
    }
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    return token;
}

export const authFetch = async (api: string) => {
    const token = await getToken();
    const res = await fetch(api, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    if (res.status === 401 || res.status === 403) {
        redirect("/unauthorized");
    }
    return res;
}


export const protectedMutation = async (api: string, method: string, data?: unknown) => {
    const token = await getToken();
    const res = await fetch(api, {
        method: method,
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: data ? JSON.stringify(data) : null
    })
    if (res.status === 401 || res.status === 403) {
        redirect("/unauthorized");
    }
    return res;
}


// Logged out users go to the login page, users with the wrong role to /unauthorized.
export const requireRole = async (role: string) => {
    const session = await getSession();
    if (!session) {
        redirect("/sign-in");
    }
    if (session.user.role !== role) {
        redirect("/unauthorized");
    }
    return session;
}
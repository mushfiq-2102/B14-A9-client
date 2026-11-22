"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { toast } from "@/components/ui/toast"

// Google login leaves the site, so the success toast is shown after the redirect back.
// The callback URL carries ?login=success, which is shown once and then removed.
export function AuthToast() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const shown = React.useRef(false)

  React.useEffect(() => {
    if (searchParams.get("login") !== "success" || shown.current) return
    shown.current = true

    toast.add({
      title: "Login successful",
      description: "Welcome to RentRig.",
      type: "success",
    })

    const params = new URLSearchParams(searchParams.toString())
    params.delete("login")
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname)
  }, [searchParams, pathname, router])

  return null
}

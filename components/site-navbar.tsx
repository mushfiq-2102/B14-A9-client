"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/components/shared/brand-logo"
import { UserAvatar } from "@/components/shared/user-avatar"
import { toast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { useSession, signOut } from "@/lib/auth-client"

export function SiteNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { data: session } = useSession()

  const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "All Equipment", href: "/all-equipment" },
    { label: "How It Works", href: "/#how-it-works" },
    ...(session?.user
      ? [{ label: "Dashboard", href: `/dashboard/${session.user.role || "customer"}` }]
      : []),
  ]

  React.useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  const handleSignOut = async () => {
    await signOut()
    setOpen(false)
    toast.add({ title: "Logged out", description: "See you again soon.", type: "success" })
    router.push("/")
    router.refresh()
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href)

  const linkClass = (href: string) =>
    cn(
      "text-base tracking-[-0.0125rem] transition-colors hover:text-white",
      isActive(href)
        ? "font-bold text-[#EDEDEF] underline underline-offset-4 decoration-[#F97316]"
        : "text-[#EDEDEF]/90"
    )

  const signInClass =
    "h-[38px] rounded-[8px] bg-transparent px-4 text-lg font-semibold text-[#FB923C] hover:bg-white/5 hover:text-[#FB923C]"

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6">
      <div className="mx-auto flex max-w-[77rem] items-center justify-between gap-6">
        <BrandLogo />

        {/* Desktop */}
        <nav
          aria-label="Main navigation"
          className="hidden h-[68px] items-center gap-6 rounded-lg border border-white/10 bg-[#1A1A1F]/95 px-6 backdrop-blur lg:flex"
        >
          <ul className="flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={linkClass(link.href)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Separator */}
          <div aria-hidden className="h-px w-6 bg-[#A8A8A8]/40" />

          <div className="flex items-center gap-4">
            {session?.user ? (
              <>
                <UserAvatar
                  src={session.user.image}
                  name={session.user.name}
                  className="size-9"
                />
                <Button onClick={handleSignOut} className={signInClass}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  render={<Link href="/sign-in" />}
                  nativeButton={false}
                  className={signInClass}
                >
                  Login
                </Button>
                <Button
                  render={<Link href="/sign-up" />}
                  nativeButton={false}
                  className="btn-brand h-[52px] rounded-[8px] px-6 text-lg font-semibold shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)]"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          aria-expanded={open}
          aria-controls="site-navbar-mobile"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="size-11 rounded-lg border border-white/10 bg-[#1A1A1F] text-[#EDEDEF] hover:bg-white/5 hover:text-white lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Mobile panel */}
      {open ? (
        <div
          id="site-navbar-mobile"
          className="mx-auto mt-3 flex max-w-[77rem] flex-col gap-2 rounded-lg border border-white/10 bg-[#1A1A1F] p-4 shadow-xl lg:hidden"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2 text-base tracking-[-0.0125rem] transition-colors hover:bg-white/5 hover:text-white",
                    isActive(link.href)
                      ? "font-bold text-[#EDEDEF]"
                      : "text-[#EDEDEF]/90"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div aria-hidden className="h-px w-full bg-[#A8A8A8]/40" />

          <div className="flex flex-col gap-2">
            {session?.user ? (
              <Button
                onClick={handleSignOut}
                className="h-[44px] rounded-[8px] border border-white/10 bg-transparent px-4 text-lg font-semibold text-[#FB923C] hover:bg-white/5"
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  render={<Link href="/sign-in" onClick={() => setOpen(false)} />}
                  nativeButton={false}
                  className="h-[44px] rounded-[8px] border border-white/10 bg-transparent px-4 text-lg font-semibold text-[#FB923C] hover:bg-white/5"
                >
                  Login
                </Button>
                <Button
                  render={<Link href="/sign-up" onClick={() => setOpen(false)} />}
                  nativeButton={false}
                  className="btn-brand h-[52px] rounded-[8px] px-6 text-lg font-semibold"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}

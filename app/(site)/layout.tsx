import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"

// Public layout: Header + dynamic content + Footer.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SiteNavbar />
            <main className="min-w-0">{children}</main>
            <SiteFooter />
        </>
    )
}

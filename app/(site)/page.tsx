import { getEquipment } from "@/lib/api/equipment"

import { HeroBanner } from "./_components/hero-banner"
import { FeaturedEquipment } from "./_components/featured-equipment"
import { CategoriesSection } from "./_components/categories-section"
import { WhyChooseUs } from "./_components/why-choose-us"
import { ReviewsSection } from "./_components/reviews-section"
import { HowItWorks } from "./_components/how-it-works"
import { OwnerCta } from "./_components/owner-cta"

// Featured equipment is fetched on every request, so the page is never prerendered.
export const dynamic = "force-dynamic"

export default async function HomePage() {
    // 6 approved equipment items (the server applies the MongoDB limit).
    let featured: Awaited<ReturnType<typeof getEquipment>> = []
    try {
        featured = await getEquipment("limit=6")
    } catch (error) {
        console.error("Failed to load featured equipment:", error)
    }

    return (
        <>
            <HeroBanner />
            <FeaturedEquipment items={featured} />
            <CategoriesSection />
            <HowItWorks />
            <WhyChooseUs />
            <ReviewsSection />
            <OwnerCta />
        </>
    )
}

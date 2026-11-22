import { PageContainer, PageHeader } from "@/components/dashboard/page-shell"
import { getFavorites } from "@/lib/api/favorites"
import { FavoritesTable } from "./_components/favorites-table"

export default async function FavoritesPage() {
    const favorites = await getFavorites()

    return (
        <PageContainer width="wide">
            <PageHeader title="Favorites" subtitle="Equipment you saved for later." />
            <FavoritesTable favorites={favorites} />
        </PageContainer>
    )
}

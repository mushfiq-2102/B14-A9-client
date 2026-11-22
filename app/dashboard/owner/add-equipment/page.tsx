import { EquipmentForm } from "@/components/dashboard/equipment-form"
import { PageContainer, PageHeader } from "@/components/dashboard/page-shell"
import { getSession } from "@/lib/core/server"

export default async function AddEquipmentPage() {
    const session = await getSession()

    return (
        <PageContainer>
            <PageHeader title="Add equipment" subtitle="List equipment for rent. An admin reviews it before it goes live." />
            <EquipmentForm
                mode="create"
                owner={{ name: session?.user.name ?? "", email: session?.user.email ?? "" }}
                redirectTo="/dashboard/owner/my-equipment"
            />
        </PageContainer>
    )
}

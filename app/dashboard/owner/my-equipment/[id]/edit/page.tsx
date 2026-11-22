import { notFound } from "next/navigation"

import { EquipmentForm } from "@/components/dashboard/equipment-form"
import { PageContainer, PageHeader } from "@/components/dashboard/page-shell"
import { getEquipmentById } from "@/lib/api/equipment"
import { getSession } from "@/lib/core/server"

export default async function EditMyEquipmentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const [session, equipment] = await Promise.all([getSession(), getEquipmentById(id)])
    // Owners can only edit their own equipment.
    if (!equipment || equipment.ownerId !== session?.user.id) notFound()

    return (
        <PageContainer>
            <PageHeader title="Update equipment" subtitle={`Edit the details of ${equipment.name}.`} />
            <EquipmentForm
                mode="edit"
                equipment={equipment}
                owner={{ name: equipment.ownerName, email: equipment.ownerEmail }}
                redirectTo="/dashboard/owner/my-equipment"
            />
        </PageContainer>
    )
}

import { notFound } from "next/navigation"

import { EquipmentForm } from "@/components/dashboard/equipment-form"
import { PageContainer, PageHeader } from "@/components/dashboard/page-shell"
import { getEquipmentById } from "@/lib/api/equipment"

export default async function AdminEditEquipmentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const equipment = await getEquipmentById(id)
    if (!equipment) notFound()

    return (
        <PageContainer>
            <PageHeader title="Update equipment" subtitle={`Edit the details of ${equipment.name}.`} />
            <EquipmentForm
                mode="edit"
                equipment={equipment}
                owner={{ name: equipment.ownerName, email: equipment.ownerEmail }}
                redirectTo="/dashboard/admin/equipment"
            />
        </PageContainer>
    )
}

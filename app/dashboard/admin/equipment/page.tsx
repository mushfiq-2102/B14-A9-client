import { PageContainer, PageHeader } from "@/components/dashboard/page-shell"
import { getAllEquipment } from "@/lib/api/equipment"
import { AllEquipmentTable } from "./_components/all-equipment-table"

export default async function AdminEquipmentPage() {
    const equipment = await getAllEquipment()

    return (
        <PageContainer width="wide">
            <PageHeader title="All equipment" subtitle="Approve, reject, update or delete any listing." />
            <AllEquipmentTable equipment={equipment} />
        </PageContainer>
    )
}

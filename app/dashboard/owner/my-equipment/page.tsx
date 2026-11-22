import Link from "next/link"

import { PageContainer, PageHeader } from "@/components/dashboard/page-shell"
import { buttonVariants } from "@/components/ui/button"
import { getOwnerEquipment } from "@/lib/api/equipment"
import { cn } from "@/lib/utils"
import { MyEquipmentTable } from "./_components/my-equipment-table"

export default async function MyEquipmentPage() {
    const equipment = await getOwnerEquipment()

    return (
        <PageContainer width="wide">
            <PageHeader
                title="My equipment"
                subtitle="Equipment you listed for rent."
                action={
                    <Link href="/dashboard/owner/add-equipment" className={cn(buttonVariants(), "btn-brand h-10 px-4")}>
                        Add equipment
                    </Link>
                }
            />
            <MyEquipmentTable equipment={equipment} />
        </PageContainer>
    )
}

import Link from "next/link"
import { Eye, Pencil } from "lucide-react"

import { TableShell, THead, tdClass } from "@/components/dashboard/table"
import { EquipmentStatusPill } from "@/components/shared/status-pills"
import { buttonVariants } from "@/components/ui/button"
import { formatRate } from "@/lib/formatters"
import type { EquipmentRow } from "@/lib/types/equipment"
import { cn } from "@/lib/utils"
import { DeleteEquipmentDialog } from "@/app/components/DeleteEquipmentDialog"

export function MyEquipmentTable({ equipment }: { equipment: EquipmentRow[] }) {
    return (
        <TableShell empty={equipment.length === 0 ? "You have not listed any equipment yet." : undefined}>
            <THead columns={["Equipment name", "Category", "Rental price", "Available quantity", "Status", "Actions"]} />
            <tbody>
                {equipment.map((item) => (
                    <tr key={item._id} className="border-b border-white/5 last:border-0">
                        <td className={cn(tdClass, "font-medium")}>{item.name}</td>
                        <td className={tdClass}>{item.category}</td>
                        <td className={tdClass}>{formatRate(item.rentalPrice, item.rentalType)}</td>
                        <td className={tdClass}>{item.availableQuantity}</td>
                        <td className={tdClass}><EquipmentStatusPill status={item.status} /></td>
                        <td className={tdClass}>
                            <div className="flex items-center gap-2">
                                <Link href={`/equipment/${item._id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                                    <Eye aria-hidden /> View Details
                                </Link>
                                <Link href={`/dashboard/owner/my-equipment/${item._id}/edit`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                                    <Pencil aria-hidden /> Update
                                </Link>
                                <DeleteEquipmentDialog item={item} />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </TableShell>
    )
}

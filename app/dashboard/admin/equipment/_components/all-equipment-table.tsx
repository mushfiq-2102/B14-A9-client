"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, Eye, Pencil, X } from "lucide-react"

import { TableShell, THead, tdClass } from "@/components/dashboard/table"
import { EquipmentStatusPill } from "@/components/shared/status-pills"
import { Button, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { updateEquipmentStatus } from "@/lib/api/equipment"
import { formatRate } from "@/lib/formatters"
import type { EquipmentRow, EquipmentStatus } from "@/lib/types/equipment"
import { cn } from "@/lib/utils"
import { DeleteEquipmentDialog } from "@/app/components/DeleteEquipmentDialog"

export function AllEquipmentTable({ equipment }: { equipment: EquipmentRow[] }) {
    const router = useRouter()

    const handleStatus = async (id: string, status: EquipmentStatus) => {
        const res = await updateEquipmentStatus(id, status)
        if (res.acknowledged) {
            toast.add({ title: `Equipment ${status}`, type: "success" })
            router.refresh()
        }
    }

    return (
        <TableShell empty={equipment.length === 0 ? "No equipment has been listed yet." : undefined}>
            <THead columns={["Equipment name", "Category", "Owner", "Rental price", "Quantity", "Status", "Actions"]} />
            <tbody>
                {equipment.map((item) => (
                    <tr key={item._id} className="border-b border-white/5 last:border-0">
                        <td className={cn(tdClass, "font-medium")}>{item.name}</td>
                        <td className={tdClass}>{item.category}</td>
                        <td className={tdClass}>{item.ownerName}</td>
                        <td className={tdClass}>{formatRate(item.rentalPrice, item.rentalType)}</td>
                        <td className={tdClass}>{item.availableQuantity}</td>
                        <td className={tdClass}><EquipmentStatusPill status={item.status} /></td>
                        <td className={tdClass}>
                            <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline" disabled={item.status === "approved"} onClick={() => handleStatus(item._id, "approved")}>
                                    <Check aria-hidden /> Approve
                                </Button>
                                <Button size="sm" variant="outline" disabled={item.status === "rejected"} onClick={() => handleStatus(item._id, "rejected")}>
                                    <X aria-hidden /> Reject
                                </Button>
                                <Link href={`/equipment/${item._id}`} aria-label={`View ${item.name}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                                    <Eye aria-hidden />
                                </Link>
                                <Link href={`/dashboard/admin/equipment/${item._id}/edit`} className={buttonVariants({ variant: "outline", size: "sm" })}>
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

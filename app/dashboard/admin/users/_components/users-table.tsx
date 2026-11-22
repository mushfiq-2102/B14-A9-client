"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { TableShell, THead, tdClass } from "@/components/dashboard/table"
import { Pill } from "@/components/shared/pill"
import { RolePill } from "@/components/shared/status-pills"
import { UserAvatar } from "@/components/shared/user-avatar"
import { UserRoleSelect } from "@/components/shared/user-role-select"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { updateUserRole, updateUserStatus } from "@/lib/actions/users"
import { formatDate } from "@/lib/formatters"
import type { UserRole, UserRow } from "@/lib/types/users"

export function UsersTable({ users }: { users: readonly UserRow[] }) {
    const router = useRouter()
    // Current role per user (row id -> role), editable below.
    const [roles, setRoles] = useState<Record<string, UserRole>>(() =>
        Object.fromEntries(users.map((user) => [user._id, user.role])),
    )

    const handleRoleChange = async (id: string, role: UserRole) => {
        setRoles((prev) => ({ ...prev, [id]: role }))
        const res = await updateUserRole(id, role)
        if (res.acknowledged) {
            toast.add({ title: "Role updated", description: `The user is now ${role}.`, type: "success" })
        }
    }

    const handleStatusChange = async (user: UserRow) => {
        const res = await updateUserStatus(user._id, !user.banned)
        if (res.acknowledged) {
            toast.add({ title: user.banned ? "User activated" : "User suspended", type: "success" })
            router.refresh()
        }
    }

    return (
        <TableShell empty={users.length === 0 ? "No users found." : undefined}>
            <THead columns={["Name", "Email", "Role", "Registration date", "Change role", "Manage"]} />
            <tbody>
                {users.map((user) => (
                    <tr key={user._id} className="border-b border-line-soft last:border-0">
                        <td className={tdClass}>
                            <div className="flex items-center gap-3">
                                <UserAvatar src={user.image} name={user.name} className="size-8" />
                                <span className="font-medium">{user.name}</span>
                                {user.banned ? <Pill label="Suspended" color="#EF4444" /> : null}
                            </div>
                        </td>
                        <td className={tdClass}>{user.email}</td>
                        <td className={tdClass}><RolePill role={roles[user._id] ?? user.role} /></td>
                        <td className={tdClass}>{formatDate(user.createdAt)}</td>
                        <td className={tdClass}>
                            <UserRoleSelect
                                value={roles[user._id] ?? user.role}
                                onChange={(role) => handleRoleChange(user._id, role)}
                            />
                        </td>
                        <td className={tdClass}>
                            <Button
                                variant={user.banned ? "outline" : "destructive"}
                                size="sm"
                                onClick={() => handleStatusChange(user)}
                            >
                                {user.banned ? "Activate" : "Suspend"}
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </TableShell>
    )
}

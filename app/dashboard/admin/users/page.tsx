import { PageContainer, PageHeader } from "@/components/dashboard/page-shell"
import { getUsers } from "@/lib/api/user"
import { UsersTable } from "./_components/users-table"

export default async function AdminUsersPage() {
    const users = await getUsers()

    return (
        <PageContainer width="wide">
            <PageHeader title="All users" subtitle="Change roles and manage every registered account." />
            <UsersTable users={users} />
        </PageContainer>
    )
}

// Profile page body shared by the customer, owner and admin dashboards.

import { PageContainer, PageHeader } from "@/components/dashboard/page-shell"
import { ProfileForm } from "@/components/dashboard/profile-form"
import { getProfile } from "@/lib/api/user"

export async function ProfileView() {
    const user = await getProfile()

    return (
        <PageContainer>
            <PageHeader title="Profile" subtitle="Update your name, photo and contact details." />
            <ProfileForm user={user} />
        </PageContainer>
    )
}

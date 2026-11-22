"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Field } from "@/components/shared/field"
import { ImageUploadField } from "@/components/shared/image-upload-field"
import { RolePill } from "@/components/shared/status-pills"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { updateProfile } from "@/lib/actions/users"
import type { UserRow } from "@/lib/types/users"

export function ProfileForm({ user }: { user: UserRow }) {
    const router = useRouter()
    const [saving, setSaving] = React.useState(false)
    const [values, setValues] = React.useState({
        name: user.name,
        image: user.image ?? "",
        phone: user.phone ?? "",
        address: user.address ?? "",
    })

    const setField = (field: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement>) =>
        setValues((prev) => ({ ...prev, [field]: event.target.value }))

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSaving(true)
        try {
            const res = await updateProfile(values)
            if (res.acknowledged) {
                toast.add({ title: "Profile updated", description: "Your changes have been saved.", type: "success" })
                router.refresh()
            } else {
                toast.add({ title: "Could not save", description: res.message ?? "Please try again.", type: "error" })
            }
        } finally {
            setSaving(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="surface-card flex flex-col gap-5 p-6">
            <div className="flex items-center justify-between gap-3">
                <ImageUploadField allowUrl value={values.image} onChange={(url) => setValues((prev) => ({ ...prev, image: url }))} />
            </div>
            <div className="flex items-center gap-2 text-sm text-ink-soft">
                Account role: <RolePill role={user.role} />
            </div>

            <Field label="Name" htmlFor="name" required>
                <Input id="name" required value={values.name} onChange={setField("name")} className="surface-field h-11" />
            </Field>
            <Field label="Email" htmlFor="email" hint="Your email cannot be changed.">
                <Input id="email" disabled value={user.email} className="surface-field h-11" />
            </Field>
            <Field label="Phone number" htmlFor="phone">
                <Input id="phone" type="tel" value={values.phone} onChange={setField("phone")} className="surface-field h-11" />
            </Field>
            <Field label="Address" htmlFor="address">
                <Input id="address" value={values.address} onChange={setField("address")} className="surface-field h-11" />
            </Field>

            <Button type="submit" disabled={saving} className="btn-brand h-12 self-start px-8 text-base font-semibold">
                {saving ? "Saving..." : "Save profile"}
            </Button>
        </form>
    )
}

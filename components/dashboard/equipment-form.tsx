"use client"

// Add / update equipment form — shared by the owner add + edit pages and the
// admin edit page. Image upload goes to imgbb.

import * as React from "react"
import { useRouter } from "next/navigation"

import { SectionCard } from "@/components/dashboard/page-shell"
import { Field } from "@/components/shared/field"
import { ImageUploadField } from "@/components/shared/image-upload-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { createEquipment, updateEquipment } from "@/lib/api/equipment"
import {
    EQUIPMENT_CATEGORIES,
    EQUIPMENT_CONDITIONS,
    EQUIPMENT_STATUS_META,
    RENTAL_TYPES,
    type EquipmentFormData,
    type EquipmentRow,
    type RentalType,
} from "@/lib/types/equipment"

const selectClass =
    "surface-field h-11 w-full rounded-lg px-3 text-sm text-ink capitalize"

const emptyValues: EquipmentFormData = {
    name: "",
    description: "",
    category: EQUIPMENT_CATEGORIES[0],
    location: "",
    rentalPrice: 0,
    rentalType: "daily",
    availableQuantity: 1,
    condition: EQUIPMENT_CONDITIONS[0],
    brand: "",
    model: "",
    image: "",
    rentalTerms: "",
}

export function EquipmentForm({
    mode,
    equipment,
    owner,
    redirectTo,
}: {
    mode: "create" | "edit"
    /** Existing equipment (edit mode). */
    equipment?: EquipmentRow
    /** Owner information shown read-only (create mode: the logged in owner). */
    owner: { name: string; email: string }
    /** Page opened after saving. */
    redirectTo: string
}) {
    const router = useRouter()
    const [submitting, setSubmitting] = React.useState(false)
    const [values, setValues] = React.useState<EquipmentFormData>(
        equipment
            ? {
                  name: equipment.name,
                  description: equipment.description,
                  category: equipment.category,
                  location: equipment.location,
                  rentalPrice: equipment.rentalPrice,
                  rentalType: equipment.rentalType,
                  availableQuantity: equipment.availableQuantity,
                  condition: equipment.condition,
                  brand: equipment.brand,
                  model: equipment.model,
                  image: equipment.image,
                  rentalTerms: equipment.rentalTerms,
              }
            : emptyValues,
    )

    const setText =
        (field: keyof EquipmentFormData) =>
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
            setValues((prev) => ({ ...prev, [field]: event.target.value }))

    const setNumber =
        (field: "rentalPrice" | "availableQuantity") =>
        (event: React.ChangeEvent<HTMLInputElement>) =>
            setValues((prev) => ({ ...prev, [field]: Number(event.target.value) }))

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!values.image) {
            toast.add({ title: "Image required", description: "Upload an equipment image first.", type: "error" })
            return
        }

        setSubmitting(true)
        try {
            const res =
                mode === "create"
                    ? await createEquipment(values)
                    : await updateEquipment((equipment as EquipmentRow)._id, values)

            if (res.insertedId || res.acknowledged) {
                toast.add({
                    title: mode === "create" ? "Equipment added" : "Equipment updated",
                    description:
                        mode === "create"
                            ? "Your equipment is pending admin approval."
                            : "The changes have been saved.",
                    type: "success",
                })
                router.push(redirectTo)
                router.refresh()
                return
            }
            toast.add({ title: "Could not save", description: res.message ?? "Please check the form.", type: "error" })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <SectionCard index={1} title="Basic information">
                <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <Field label="Equipment name" htmlFor="name" required>
                            <Input id="name" required value={values.name} onChange={setText("name")} className="surface-field h-11" />
                        </Field>
                    </div>
                    <div className="sm:col-span-2">
                        <Field label="Description" htmlFor="description" required>
                            <Textarea id="description" required rows={4} value={values.description} onChange={setText("description")} className="surface-field" />
                        </Field>
                    </div>
                    <Field label="Category" htmlFor="category" required>
                        <select id="category" value={values.category} onChange={setText("category")} className={selectClass}>
                            {EQUIPMENT_CATEGORIES.map((category) => (
                                <option key={category} value={category} className="bg-panel">{category}</option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Location" htmlFor="location" required>
                        <Input id="location" required value={values.location} onChange={setText("location")} placeholder="City, area" className="surface-field h-11" />
                    </Field>
                    <Field label="Brand" htmlFor="brand" required>
                        <Input id="brand" required value={values.brand} onChange={setText("brand")} className="surface-field h-11" />
                    </Field>
                    <Field label="Model" htmlFor="model" required>
                        <Input id="model" required value={values.model} onChange={setText("model")} className="surface-field h-11" />
                    </Field>
                    <Field label="Equipment condition" htmlFor="condition" required>
                        <select id="condition" value={values.condition} onChange={setText("condition")} className={selectClass}>
                            {EQUIPMENT_CONDITIONS.map((condition) => (
                                <option key={condition} value={condition} className="bg-panel">{condition}</option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Status" htmlFor="status" hint="New equipment stays pending until an admin approves it.">
                        <Input
                            id="status"
                            disabled
                            value={EQUIPMENT_STATUS_META[equipment?.status ?? "pending"].label}
                            className="surface-field h-11"
                        />
                    </Field>
                </div>
            </SectionCard>

            <SectionCard index={2} title="Rental pricing">
                <div className="grid gap-5 sm:grid-cols-3">
                    <Field label="Rental price (USD)" htmlFor="rentalPrice" required>
                        <Input id="rentalPrice" type="number" required min={1} step="0.01" value={values.rentalPrice || ""} onChange={setNumber("rentalPrice")} className="surface-field h-11" />
                    </Field>
                    <Field label="Rental type" htmlFor="rentalType" required>
                        <select
                            id="rentalType"
                            value={values.rentalType}
                            onChange={(event) => setValues((prev) => ({ ...prev, rentalType: event.target.value as RentalType }))}
                            className={selectClass}
                        >
                            {RENTAL_TYPES.map((type) => (
                                <option key={type} value={type} className="bg-panel">{type}</option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Available quantity" htmlFor="availableQuantity" required>
                        <Input id="availableQuantity" type="number" required min={0} step={1} value={values.availableQuantity} onChange={setNumber("availableQuantity")} className="surface-field h-11" />
                    </Field>
                </div>
            </SectionCard>

            <SectionCard index={3} title="Image, terms and owner">
                <div className="flex flex-col gap-5">
                    <Field label="Equipment image" htmlFor="image" required>
                        <ImageUploadField shape="square" value={values.image} onChange={(url) => setValues((prev) => ({ ...prev, image: url }))} />
                    </Field>
                    <Field label="Rental terms and conditions" htmlFor="rentalTerms" required>
                        <Textarea id="rentalTerms" required rows={4} value={values.rentalTerms} onChange={setText("rentalTerms")} className="surface-field" />
                    </Field>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Owner name" htmlFor="ownerName">
                            <Input id="ownerName" disabled value={equipment?.ownerName ?? owner.name} className="surface-field h-11" />
                        </Field>
                        <Field label="Owner email" htmlFor="ownerEmail">
                            <Input id="ownerEmail" disabled value={equipment?.ownerEmail ?? owner.email} className="surface-field h-11" />
                        </Field>
                    </div>
                </div>
            </SectionCard>

            <Button type="submit" disabled={submitting} className="btn-brand h-12 self-start px-8 text-base font-semibold">
                {submitting ? "Saving..." : mode === "create" ? "Add equipment" : "Save changes"}
            </Button>
        </form>
    )
}

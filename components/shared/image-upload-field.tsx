"use client"

// Image picker: uploads the chosen file to imgbb and reports the hosted URL.
// Optionally also accepts a direct image link (sign-up / profile photo).

import * as React from "react"
import { Trash2, Upload } from "lucide-react"

import { Input } from "@/components/ui/input"
import { RemoteImage } from "@/components/shared/remote-image"
import { toast } from "@/components/ui/toast"
import { uploadImage } from "@/lib/upload"

export function ImageUploadField({
  value,
  onChange,
  allowUrl = false,
  shape = "circle",
}: {
  value: string
  onChange: (url: string) => void
  /** Also show a text input for a direct image link. */
  allowUrl?: boolean
  shape?: "circle" | "square"
}) {
  const [uploading, setUploading] = React.useState(false)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      onChange(await uploadImage(file))
    } catch {
      toast.add({
        title: "Upload failed",
        description: "The image could not be uploaded. Please try again.",
        type: "error",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <RemoteImage
          src={value}
          alt="Selected image preview"
          className={`size-16 shrink-0 border border-white/10 object-cover ${
            shape === "circle" ? "rounded-full" : "rounded-xl"
          }`}
        />

        <label className="flex h-11 cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-[#1A1A1F] px-4 text-sm text-[#EDEDEF]/80 transition-colors hover:border-white/25 hover:text-white">
          <Upload aria-hidden className="size-4" />
          {uploading ? "Uploading..." : value ? "Change image" : "Upload image"}
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            disabled={uploading}
            onChange={handleFileChange}
          />
        </label>

        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Remove selected image"
            className="rounded-md p-2 text-white/50 transition-colors hover:text-white"
          >
            <Trash2 aria-hidden className="size-4" />
          </button>
        ) : null}
      </div>

      {allowUrl ? (
        <Input
          type="url"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Or paste a direct image link"
          aria-label="Image link"
          className="surface-field h-11"
        />
      ) : null}
    </div>
  )
}

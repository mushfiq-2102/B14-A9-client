"use client"

import * as React from "react"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"

import { ImageUploadField } from "@/components/shared/image-upload-field"
import { toast } from "@/components/ui/toast"

export type AuthMode = "signin" | "signup"

export type AuthFormData = {
  email: string
  password: string
  name?: string
  /** Profile photo URL (direct link or imgbb upload). */
  image?: string
}

const COPY = {
  signin: {
    title: "Welcome back",
    subtitle: "Sign in to rent, list and manage equipment.",
    submitLabel: "Sign In",
    showName: false,
    footer: "New to RentRig?",
    footerLinkHref: "/sign-up",
    footerLinkLabel: "Create an account",
  },
  signup: {
    title: "Create your account",
    subtitle: "Join RentRig and rent the gear your next job needs.",
    submitLabel: "Sign Up",
    showName: true,
    footer: "Already have an account?",
    footerLinkHref: "/sign-in",
    footerLinkLabel: "Sign in",
  },
} as const

const inputClass =
  "h-12 w-full rounded-lg border surface-field pl-10 pr-3 text-base tracking-[-0.0125rem] text-[#EDEDEF] shadow-[inset_0_3px_10px_rgba(255,255,255,0.04)] outline-none transition-colors placeholder:text-white/60 focus:ring-2 focus:ring-[#F97316]/30"
const labelClass = "mb-2 block text-left text-sm text-[#EDEDEF]/80"

/** Password rule: an uppercase letter, a lowercase letter and at least 6 characters. */
export const getPasswordError = (password: string) => {
  if (password.length < 6) return "Password must be at least 6 characters long."
  if (!/[A-Z]/.test(password)) return "Password must include an uppercase letter."
  if (!/[a-z]/.test(password)) return "Password must include a lowercase letter."
  return null
}

function GoogleIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-5">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.8-5.5 3.8-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.3 14.6 2.3 12 2.3 6.7 2.3 2.4 6.6 2.4 12s4.3 9.7 9.6 9.7c5.5 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6H12z" />
    </svg>
  )
}

export function AuthForm({
  mode,
  onSubmit,
  onGoogle,
  error,
}: {
  mode: AuthMode
  /** Called with the collected form values when the form is submitted. */
  onSubmit?: (data: AuthFormData) => void
  /** Called when "Continue with Google" is clicked. */
  onGoogle?: () => void
  /** Shown under the submit button, e.g. an auth API error message. */
  error?: string | null
}) {
  const copy = COPY[mode]
  const isSignup = mode === "signup"

  const [values, setValues] = React.useState<AuthFormData>({
    email: "",
    password: "",
    name: "",
    image: "",
  })
  const [showPassword, setShowPassword] = React.useState(false)

  const setField =
    (field: keyof AuthFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setValues((prev) => ({ ...prev, [field]: event.target.value }))

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSignup) {
      const passwordError = getPasswordError(values.password)
      if (passwordError) {
        toast.add({
          title: "Invalid password",
          description: passwordError,
          type: "error",
        })
        return
      }
    }

    const data: AuthFormData = {
      email: values.email,
      password: values.password,
      ...(isSignup ? { name: values.name, image: values.image } : {}),
    }
    onSubmit?.(data)
  }

  return (
    <div className="surface-card w-full p-8">
      <div className="mb-8 flex flex-col gap-2 text-center">
        <h1 className="page-title">{copy.title}</h1>
        <p className="text-base leading-[1.6] text-white/70">{copy.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {copy.showName ? (
          <div>
            <label htmlFor="name" className={labelClass}>
              Full name
            </label>
            <div className="relative">
              <User
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-white/50"
              />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                maxLength={80}
                value={values.name ?? ""}
                onChange={setField("name")}
                placeholder="Jane Doe"
                className={inputClass}
              />
            </div>
          </div>
        ) : null}

        <div>
          <label htmlFor="email" className={labelClass}>
            Email address
          </label>
          <div className="relative">
            <Mail
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-white/50"
            />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={setField("email")}
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>
        </div>

        {copy.showName ? (
          <fieldset>
            <legend className={labelClass}>Profile photo (optional)</legend>
            <ImageUploadField
              allowUrl
              value={values.image ?? ""}
              onChange={(url) => setValues((prev) => ({ ...prev, image: url }))}
            />
          </fieldset>
        ) : null}

        <div>
          <label htmlFor="password" className={labelClass}>
            Password
          </label>
          <div className="relative">
            <Lock
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-white/50"
            />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={isSignup ? "new-password" : "current-password"}
              required
              maxLength={72}
              value={values.password}
              onChange={setField("password")}
              placeholder={
                isSignup ? "Upper and lower case, 6+ characters" : "Your password"
              }
              className={`${inputClass} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1.5 text-white/50 transition-colors hover:text-white"
            >
              {showPassword ? (
                <EyeOff aria-hidden className="size-4" />
              ) : (
                <Eye aria-hidden className="size-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn-brand mt-1 h-[52px] w-full rounded-[8px] text-lg font-semibold shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
        >
          {copy.submitLabel}
        </button>

        <div className="flex items-center gap-3 text-sm text-white/50">
          <span aria-hidden className="h-px flex-1 bg-white/10" />
          or
          <span aria-hidden className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          onClick={onGoogle}
          className="flex h-[52px] w-full items-center justify-center gap-3 rounded-[8px] border border-white/10 bg-[#1A1A1F] text-base font-medium text-[#EDEDEF] transition-colors hover:border-white/25"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        {error ? (
          <p
            role="alert"
            className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {error}
          </p>
        ) : null}
      </form>

      <p className="mt-8 text-center text-base text-white/70">
        {copy.footer}{" "}
        <Link
          href={copy.footerLinkHref}
          className="font-semibold text-[#FDBA74] transition-colors hover:text-white"
        >
          {copy.footerLinkLabel}
        </Link>
      </p>
    </div>
  )
}

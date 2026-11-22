// Adds the flag that makes the site show the "Login successful" toast after a Google login.
export const withLoginFlag = (path: string) =>
    `${path}${path.includes("?") ? "&" : "?"}login=success`

// Only in-site paths are allowed, never an external URL.
export const safeRedirectPath = (path: string | null) =>
    path && path.startsWith("/") && !path.startsWith("//") ? path : "/"

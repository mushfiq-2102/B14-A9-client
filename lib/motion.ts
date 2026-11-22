// Shared Framer Motion presets (see Framer-Motion-guide.md): spread a preset on
// a `motion.*` element, e.g. <motion.div {...fadeInUp}>.

export const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
}

export const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.15 },
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
}

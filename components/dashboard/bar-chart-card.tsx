"use client"

// Monthly bar chart card (Recharts) used by the admin and owner dashboards.

import { useTheme } from "next-themes"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { formatMonth } from "@/lib/formatters"

export function BarChartCard({
    title,
    subtitle,
    data,
    dataKey,
    valuePrefix = "",
}: {
    title: string
    subtitle: string
    /** One entry per month: { month: "2026-11", <dataKey>: number }. */
    data: ({ month: string } & Record<string, number | string>)[]
    dataKey: string
    /** e.g. "$" for money values. */
    valuePrefix?: string
}) {
    // SVG colors cannot use the CSS tokens, so they follow the selected theme here
    const light = useTheme().resolvedTheme === "light"
    const grid = light ? "rgba(15,23,42,0.1)" : "rgba(255,255,255,0.08)"
    const axis = light ? "#475569" : "#A0A0AB"
    const chartData = data.map((item) => ({ ...item, label: formatMonth(item.month) }))

    return (
        <section className="surface-card p-6">
            <h2 className="font-heading text-lg font-semibold text-strong">{title}</h2>
            <p className="mt-1 text-sm text-ink-soft">{subtitle}</p>

            {chartData.length === 0 ? (
                <p className="py-16 text-center text-sm text-ink-soft">
                    No data yet. Numbers appear after the first booking.
                </p>
            ) : (
                <div className="mt-6 h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid stroke={grid} vertical={false} />
                            <XAxis dataKey="label" stroke={axis} fontSize={12} tickLine={false} />
                            <YAxis
                                stroke={axis}
                                fontSize={12}
                                tickLine={false}
                                allowDecimals={false}
                                tickFormatter={(value) => `${valuePrefix}${value}`}
                            />
                            <Tooltip
                                cursor={{ fill: light ? "rgba(15,23,42,0.05)" : "rgba(255,255,255,0.05)" }}
                                formatter={(value) => [`${valuePrefix}${value}`, title]}
                                contentStyle={{
                                    background: light ? "#FFFFFF" : "#141418",
                                    border: `1px solid ${light ? "rgba(15,23,42,0.15)" : "rgba(255,255,255,0.1)"}`,
                                    borderRadius: 8,
                                    color: light ? "#0F172A" : "#EDEDEF",
                                }}
                            />
                            <Bar dataKey={dataKey} fill="#F97316" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </section>
    )
}

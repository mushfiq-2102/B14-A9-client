"use client"

// Monthly bar chart card (Recharts) used by the admin and owner dashboards.

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
    const chartData = data.map((item) => ({ ...item, label: formatMonth(item.month) }))

    return (
        <section className="surface-card p-6">
            <h2 className="font-heading text-lg font-semibold text-white">{title}</h2>
            <p className="mt-1 text-sm text-white/60">{subtitle}</p>

            {chartData.length === 0 ? (
                <p className="py-16 text-center text-sm text-white/50">
                    No data yet. Numbers appear after the first booking.
                </p>
            ) : (
                <div className="mt-6 h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                            <XAxis dataKey="label" stroke="#A0A0AB" fontSize={12} tickLine={false} />
                            <YAxis
                                stroke="#A0A0AB"
                                fontSize={12}
                                tickLine={false}
                                allowDecimals={false}
                                tickFormatter={(value) => `${valuePrefix}${value}`}
                            />
                            <Tooltip
                                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                formatter={(value) => [`${valuePrefix}${value}`, title]}
                                contentStyle={{
                                    background: "#141418",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: 8,
                                    color: "#EDEDEF",
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

"use client"

import React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { insuranceData } from "@/lib/data"

interface FollowersChartProps {
  data: typeof insuranceData
  onBankClick: (bank: (typeof insuranceData)[0]) => void
}

function formatFollowers(num: number) {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M"
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K"
  return num.toString()
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { bank, followers } = payload[0].payload
    return (
      <div className="bg-slate-900 border border-slate-600 rounded-lg p-2">
        <p className="text-slate-100 font-semibold">{bank.company_name}</p>
        <p className="text-blue-400">Obunachilar soni: {formatFollowers(followers)}</p>
      </div>
    )
  }
  return null
}

export function FollowersChart({ data, onBankClick }: FollowersChartProps) {
  // don't mutate original data
  const topBanks = [...data].sort((a, b) => b.followers - a.followers).slice(0, 10)

  const chartData = topBanks.map((bank, index) => ({
    name: (index + 1).toString(),
    followers: bank.followers,
    bank,
  }))

  // compute dataMax to use in domain (optional — Recharts also accepts function)
  const dataMax = Math.max(...chartData.map(d => d.followers))

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 20, left: 0, bottom: 0 }} // <-- give top padding so ticks aren't cut
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="name" stroke="#94a3b8" />
        <YAxis
          stroke="#94a3b8"
          tickFormatter={(value) => formatFollowers(Number(value))}
          domain={[0, (max: number) => Math.ceil(max * 1.1)]} // <-- give 10% headroom
          // optionally control tickCount: tickCount={6}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(59, 130, 246, 0.08)" }} />
        <Bar
          dataKey="followers"
          fill="#DD2A7B"
          onClick={(d: any) => onBankClick(d.bank)}
          cursor="pointer"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

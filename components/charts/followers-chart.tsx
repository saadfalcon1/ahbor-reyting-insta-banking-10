"use client"

import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import type { insuranceData } from "@/lib/data"

interface FollowersChartProps {
  data: typeof insuranceData
  onBankClick: (bank: (typeof insuranceData)[0]) => void
}

// Follower sonlarini K va M formatda chiqarish
function formatFollowers(num: number) {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M"
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K"
  return num.toString()
}

// Tooltip (hoverda chiqadigan info)
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { bank, followers } = payload[0].payload
    return (
      <div className="bg-slate-900 border border-slate-600 rounded-lg p-2">
        <p className="text-slate-100 font-semibold">{bank.company_name}</p>
        <p className="text-pink-400">Obunachilar soni: {formatFollowers(followers)}</p>
      </div>
    )
  }
  return null
}

export function FollowersChart({ data, onBankClick }: FollowersChartProps) {
  // Original datani o‘zgartirmaslik uchun nusxa olamiz
  const topBanks = [...data].sort((a, b) => b.followers - a.followers).slice(0, 10)

  const chartData = topBanks.map((bank, index) => ({
    name: (index + 1).toString(),
    followers: bank.followers,
    bank,
  }))

  const dataMax = Math.max(...chartData.map((d) => d.followers))

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
      >
        {/* Instagram gradient definitsiyasi */}
        <defs>
          <linearGradient id="instagramGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F58529" />
            <stop offset="25%" stopColor="#DD2A7B" />
            <stop offset="60%" stopColor="#8134AF" />
            <stop offset="100%" stopColor="#515BD4" />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="name" stroke="#94a3b8" />
        <YAxis
          stroke="#94a3b8"
          tickFormatter={(value) => formatFollowers(Number(value))}
          domain={[0, (max: number) => Math.ceil(max * 1.1)]}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: "rgba(221, 42, 123, 0.08)" }}
        />
        <Bar
          dataKey="followers"
          fill="url(#instagramGradient)"
          onClick={(d: any) => onBankClick(d.bank)}
          cursor="pointer"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

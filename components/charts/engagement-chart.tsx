"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { insuranceData } from "@/lib/data"

interface EngagementChartProps {
  data: typeof insuranceData
  onBankClick: (bank: (typeof insuranceData)[0]) => void
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-900 border border-slate-600 rounded-lg p-3">
        <p className="text-slate-100 font-semibold">{data.bank.company_name}</p>
        <p className="text-cyan-400">Layklar soni: {data.likes.toLocaleString()}</p>
        <p className="text-purple-400">Kommentlar soni: {data.comments.toLocaleString()}</p>
      </div>
    )
  }
  return null
}

export function EngagementChart({ data, onBankClick }: EngagementChartProps) {
  const topBanks = data.sort((a, b) => b.avg_likes - a.avg_likes).slice(0, 10)

  const chartData = topBanks.map((bank, index) => ({
    name: (index + 1).toString(),
    likes: bank.avg_likes,
    comments: bank.avg_comments,
    bank,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="name" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(59, 130, 246, 0.1)" }} />
        <Bar dataKey="likes" fill="#06b6d4" radius={[8, 8, 0, 0]} />
        <Bar dataKey="comments" fill="#8b5cf6" radius={[8,8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

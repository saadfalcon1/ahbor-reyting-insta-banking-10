"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FollowersChart } from "./charts/followers-chart"
import { EngagementChart } from "./charts/engagement-chart"
import { PostingFrequencyChart } from "./charts/posting-frequency-chart"
import { BanksList } from "./banks-list"
import { insuranceData } from "@/lib/data"

interface AnalyticsDashboardProps {
  onBankClick: (bank: (typeof insuranceData)[0]) => void
}

export function AnalyticsDashboard({ onBankClick }: AnalyticsDashboardProps) {
  const stats = useMemo(() => {
    const totalFollowers = insuranceData.reduce((sum, bank) => sum + bank.followers, 0)
    const avgEngagementRate = (
      insuranceData.reduce((sum, bank) => sum + bank.er_percent, 0) / insuranceData.length
    ).toFixed(2)
    const avgLikes = (insuranceData.reduce((sum, bank) => sum + bank.avg_likes, 0) / insuranceData.length).toFixed(1)
    const topBank = insuranceData.reduce((prev, current) => (current.followers > prev.followers ? current : prev))

    return { totalFollowers, avgEngagementRate, avgLikes, topBank }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            {/* Logo container for Instagram and Ahbor logos */}
            <div className="flex items-center gap-2 shrink-0">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
                className="h-12 sm:h-14 md:h-20 w-auto"
              />
              <img src="/Ahborlogo.png" alt="Ahbor" className="h-6 sm:h-8 md:h-12 w-auto object-contain" />
            </div>
            {/* Title section */}
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 break-words">
                Banklarning Instagramdagi faoliyati va ko'rsatkichlari
              </h1>
              <p className="text-slate-400 text-sm sm:text-base">Yangilangan sana: 31-oktabr 2025-yil</p>
            </div>
          </div>
        </div>

        {/* Asosiy ko'rsatkichlar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Jami obunachilar" value={stats.totalFollowers.toLocaleString()} icon="👥" />
          <MetricCard label="O'rtacha jalb qilish darajasi" value={`${stats.avgEngagementRate}%`} icon="📈" />
          <MetricCard label="Har bir nashrga o'rtacha yoqtirishlar soni" value={stats.avgLikes} icon="❤️" />
          <MetricCard
            label="Eng faol bank"
            value={stats.topBank.company_name}
            icon="🏆"
            subtitle={`${stats.topBank.followers.toLocaleString()} obunachi`}
          />
        </div>

        {/* Diagrammalar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Eng ko'p obunachilarga ega top-10 banklar</CardTitle>
              <CardDescription>Instagramda eng katta auditoriyaga ega banklar</CardDescription>
            </CardHeader>
            <CardContent>
              <FollowersChart data={insuranceData} onBankClick={onBankClick} />
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">O'rtacha yoqtirishlar va izohlar soni</CardTitle>
              <CardDescription>Har bir nashr uchun o'rtacha yoqtirishlar va izohlar soni</CardDescription>
            </CardHeader>
            <CardContent>
              <EngagementChart data={insuranceData} onBankClick={onBankClick} />
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">O'rtacha nashrlar soni</CardTitle>
              <CardDescription>Har bir bank tomonidan bir oyda joylashtirilgan nashrlar soni</CardDescription>
            </CardHeader>
            <CardContent>
              <PostingFrequencyChart data={insuranceData} onBankClick={onBankClick} />
            </CardContent>
          </Card>
        </div>

        {/* Kompaniyalar ro'yxati */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Barcha bank kanallari</CardTitle>
            <CardDescription>Kanal ma'lumotlari ro'yxat ko'rinishida</CardDescription>
          </CardHeader>
          <CardContent>
            <BanksList data={insuranceData} onBankClick={onBankClick} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface MetricCardProps {
  label: string
  value: string
  icon: string
  subtitle?: string
}

function MetricCard({ label, value, icon, subtitle }: MetricCardProps) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  )
}

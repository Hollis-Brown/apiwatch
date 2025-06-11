"use client"
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  {
    subject: "Stability",
    "Your APIs": 80,
    "Industry Avg": 65,
    fullMark: 100,
  },
  {
    subject: "Documentation",
    "Your APIs": 75,
    "Industry Avg": 60,
    fullMark: 100,
  },
  {
    subject: "Uptime",
    "Your APIs": 90,
    "Industry Avg": 85,
    fullMark: 100,
  },
  {
    subject: "Versioning",
    "Your APIs": 65,
    "Industry Avg": 55,
    fullMark: 100,
  },
  {
    subject: "Support",
    "Your APIs": 70,
    "Industry Avg": 60,
    fullMark: 100,
  },
]

export function ApiRiskRadar() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#374151" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: "#9ca3af", fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#9ca3af", fontSize: 10 }} />
        <Radar name="Your APIs" dataKey="Your APIs" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
        <Radar name="Industry Average" dataKey="Industry Avg" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
        <Tooltip
          contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "#fff" }}
          labelStyle={{ color: "#9ca3af" }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}

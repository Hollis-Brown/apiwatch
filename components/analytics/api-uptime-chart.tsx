"use client"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Stripe",
    uptime: 99.98,
  },
  {
    name: "Twilio",
    uptime: 99.95,
  },
  {
    name: "GitHub",
    uptime: 99.7,
  },
  {
    name: "OpenAI",
    uptime: 99.85,
  },
  {
    name: "Twitter",
    uptime: 99.5,
  },
]

export function ApiUptimeChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
          domain={[99, 100]}
        />
        <Tooltip
          contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "#fff" }}
          labelStyle={{ color: "#9ca3af" }}
          formatter={(value: number) => [`${value.toFixed(2)}%`, "Uptime"]}
        />
        <Bar dataKey="uptime" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  )
}

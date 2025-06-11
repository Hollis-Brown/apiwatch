"use client"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Mon",
    "Stripe API": 4000,
    "Twilio API": 2400,
    "GitHub API": 2400,
    "OpenAI API": 1800,
    "Twitter API": 2800,
  },
  {
    name: "Tue",
    "Stripe API": 4500,
    "Twilio API": 2100,
    "GitHub API": 2200,
    "OpenAI API": 2000,
    "Twitter API": 2500,
  },
  {
    name: "Wed",
    "Stripe API": 4780,
    "Twilio API": 2300,
    "GitHub API": 2500,
    "OpenAI API": 2300,
    "Twitter API": 2700,
  },
  {
    name: "Thu",
    "Stripe API": 4800,
    "Twilio API": 2800,
    "GitHub API": 2600,
    "OpenAI API": 2400,
    "Twitter API": 2900,
  },
  {
    name: "Fri",
    "Stripe API": 5000,
    "Twilio API": 2900,
    "GitHub API": 2700,
    "OpenAI API": 2500,
    "Twitter API": 3000,
  },
  {
    name: "Sat",
    "Stripe API": 3500,
    "Twilio API": 2000,
    "GitHub API": 1800,
    "OpenAI API": 1500,
    "Twitter API": 2200,
  },
  {
    name: "Sun",
    "Stripe API": 3000,
    "Twilio API": 1800,
    "GitHub API": 1600,
    "OpenAI API": 1200,
    "Twitter API": 2000,
  },
]

export function ApiCallVolumeChart() {
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
          tickFormatter={(value) => `${value / 1000}k`}
        />
        <Tooltip
          contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "#fff" }}
          labelStyle={{ color: "#9ca3af" }}
          formatter={(value: number) => [`${value.toLocaleString()} calls`, ""]}
        />
        <Bar dataKey="Stripe API" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
        <Bar dataKey="Twilio API" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
        <Bar dataKey="GitHub API" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
        <Bar dataKey="OpenAI API" stackId="a" fill="#8b5cf6" radius={[0, 0, 0, 0]} />
        <Bar dataKey="Twitter API" stackId="a" fill="#ec4899" radius={[0, 0, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

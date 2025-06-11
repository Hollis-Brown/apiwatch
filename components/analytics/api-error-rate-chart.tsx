"use client"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    "Stripe API": 0.2,
    "Twilio API": 0.5,
    "GitHub API": 1.2,
    "OpenAI API": 0.8,
    "Twitter API": 1.5,
  },
  {
    name: "Feb",
    "Stripe API": 0.3,
    "Twilio API": 0.4,
    "GitHub API": 1.0,
    "OpenAI API": 0.7,
    "Twitter API": 1.3,
  },
  {
    name: "Mar",
    "Stripe API": 0.2,
    "Twilio API": 0.6,
    "GitHub API": 1.3,
    "OpenAI API": 0.9,
    "Twitter API": 1.7,
  },
  {
    name: "Apr",
    "Stripe API": 0.1,
    "Twilio API": 0.5,
    "GitHub API": 1.5,
    "OpenAI API": 1.0,
    "Twitter API": 1.8,
  },
  {
    name: "May",
    "Stripe API": 0.2,
    "Twilio API": 0.3,
    "GitHub API": 1.2,
    "OpenAI API": 0.8,
    "Twitter API": 1.4,
  },
  {
    name: "Jun",
    "Stripe API": 0.1,
    "Twilio API": 0.4,
    "GitHub API": 0.9,
    "OpenAI API": 0.6,
    "Twitter API": 1.2,
  },
]

export function ApiErrorRateChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
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
        />
        <Tooltip
          contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "#fff" }}
          labelStyle={{ color: "#9ca3af" }}
          formatter={(value: number) => [`${value.toFixed(2)}%`, "Error Rate"]}
        />
        <Area type="monotone" dataKey="Stripe API" stroke="#3b82f6" fill="#3b82f680" strokeWidth={2} />
        <Area type="monotone" dataKey="Twilio API" stroke="#10b981" fill="#10b98180" strokeWidth={2} />
        <Area type="monotone" dataKey="GitHub API" stroke="#f59e0b" fill="#f59e0b80" strokeWidth={2} />
        <Area type="monotone" dataKey="OpenAI API" stroke="#8b5cf6" fill="#8b5cf680" strokeWidth={2} />
        <Area type="monotone" dataKey="Twitter API" stroke="#ec4899" fill="#ec489980" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

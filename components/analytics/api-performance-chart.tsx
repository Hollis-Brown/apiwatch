"use client"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    "Stripe API": 120,
    "Twilio API": 145,
    "GitHub API": 200,
    "OpenAI API": 230,
    "Twitter API": 180,
  },
  {
    name: "Feb",
    "Stripe API": 132,
    "Twilio API": 135,
    "GitHub API": 220,
    "OpenAI API": 240,
    "Twitter API": 170,
  },
  {
    name: "Mar",
    "Stripe API": 125,
    "Twilio API": 162,
    "GitHub API": 180,
    "OpenAI API": 255,
    "Twitter API": 190,
  },
  {
    name: "Apr",
    "Stripe API": 118,
    "Twilio API": 158,
    "GitHub API": 230,
    "OpenAI API": 245,
    "Twitter API": 220,
  },
  {
    name: "May",
    "Stripe API": 110,
    "Twilio API": 142,
    "GitHub API": 210,
    "OpenAI API": 280,
    "Twitter API": 210,
  },
  {
    name: "Jun",
    "Stripe API": 105,
    "Twilio API": 130,
    "GitHub API": 250,
    "OpenAI API": 290,
    "Twitter API": 230,
  },
]

export function ApiPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
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
          tickFormatter={(value) => `${value}ms`}
        />
        <Tooltip
          contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "#fff" }}
          labelStyle={{ color: "#9ca3af" }}
        />
        <Line
          type="monotone"
          dataKey="Stripe API"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: "#3b82f6" }}
        />
        <Line
          type="monotone"
          dataKey="Twilio API"
          stroke="#10b981"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: "#10b981" }}
        />
        <Line
          type="monotone"
          dataKey="GitHub API"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: "#f59e0b" }}
        />
        <Line
          type="monotone"
          dataKey="OpenAI API"
          stroke="#8b5cf6"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: "#8b5cf6" }}
        />
        <Line
          type="monotone"
          dataKey="Twitter API"
          stroke="#ec4899"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: "#ec4899" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

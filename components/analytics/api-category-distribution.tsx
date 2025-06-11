"use client"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Payment", value: 35, color: "#3b82f6" },
  { name: "Communication", value: 20, color: "#10b981" },
  { name: "Developer Tools", value: 25, color: "#f59e0b" },
  { name: "AI & ML", value: 15, color: "#8b5cf6" },
  { name: "Social Media", value: 5, color: "#ec4899" },
]

export function ApiCategoryDistribution() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "#fff" }}
          formatter={(value: number) => [`${value}%`, "Percentage"]}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

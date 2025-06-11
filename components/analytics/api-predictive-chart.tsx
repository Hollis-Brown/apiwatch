"use client"
import { Area, AreaChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  // Historical data
  { month: "Jan", stability: 85, prediction: null, upperBound: null, lowerBound: null, isHistorical: true },
  { month: "Feb", stability: 82, prediction: null, upperBound: null, lowerBound: null, isHistorical: true },
  { month: "Mar", stability: 78, prediction: null, upperBound: null, lowerBound: null, isHistorical: true },
  { month: "Apr", stability: 80, prediction: null, upperBound: null, lowerBound: null, isHistorical: true },
  { month: "May", stability: 75, prediction: null, upperBound: null, lowerBound: null, isHistorical: true },
  { month: "Jun", stability: 72, prediction: null, upperBound: null, lowerBound: null, isHistorical: true },
  // Prediction data
  { month: "Jul", stability: null, prediction: 70, upperBound: 75, lowerBound: 65, isHistorical: false },
  { month: "Aug", stability: null, prediction: 68, upperBound: 74, lowerBound: 62, isHistorical: false },
  { month: "Sep", stability: null, prediction: 65, upperBound: 72, lowerBound: 58, isHistorical: false },
  { month: "Oct", stability: null, prediction: 62, upperBound: 70, lowerBound: 54, isHistorical: false },
  { month: "Nov", stability: null, prediction: 60, upperBound: 69, lowerBound: 51, isHistorical: false },
  { month: "Dec", stability: null, prediction: 58, upperBound: 68, lowerBound: 48, isHistorical: false },
]

export function ApiPredictiveChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="month" stroke="#888888" />
        <YAxis stroke="#888888" domain={[0, 100]} />
        <Tooltip
          contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "#fff" }}
          labelStyle={{ color: "#9ca3af" }}
        />
        <Legend />
        <defs>
          <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="upperBound"
          stroke="transparent"
          fill="url(#confidenceGradient)"
          fillOpacity={1}
          name="Confidence Interval"
        />
        <Area type="monotone" dataKey="lowerBound" stroke="transparent" fill="transparent" />
        <Line
          type="monotone"
          dataKey="stability"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          name="Historical Stability"
        />
        <Line
          type="monotone"
          dataKey="prediction"
          stroke="#3b82f6"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          name="Predicted Stability"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export type Plan = "free" | "pro" | "enterprise"

export type User = {
  id: string
  email: string
  name: string
  avatar?: string
  plan: Plan
  apisUsed: number
  apisLimit: number
  join

"use client"
import type { DateRange } from "react-day-picker"
import { format } from "date-fns"

// Types
type SearchResult = {
  id: string
  type: "api" | "discussion" | "tutorial" | "change" | "member"
  title: string
  description: string
  url: string
  relevance: number
  category?: string
  tags: string[]
  date: string
  author?: string
  status?: string
  highlighted?: string[]
}

type SavedSearch = {
  id: string
  name: string
  query: string
  filters: SearchFilters
  createdAt: string
  lastUsed: string
}

type SearchFilters = {
  type: string[]
  category: string[]
  dateRange?: DateRange
  status: string[]
  tags: string[]
  author?: string
  sortBy: string
}

// Sample data
const searchSuggestions = [
  "payment APIs that support webhooks",
  "OpenAI API rate limits",
  "Stripe webhook verification",
  "Twitter API migration guide",
  "deprecated APIs 2024",
  "real-time APIs for chat",
  "authentication best practices",
  "API monitoring tools",
]

const recentSearches = [
  "Stripe API changes",
  "webhook security",
  "GraphQL vs REST",
  "API rate limiting",
  "OAuth 2.0 implementation",
]

const savedSearches: SavedSearch[] = [
  {
    id: "1",
    name: "Payment API Updates",
    query: "payment API changes",
    filters: {
      type: ["api", "change"],
      category: ["payment"],
      status: [],
      tags: ["stripe", "paypal"],
      sortBy: "date",
    },
    createdAt: "2024-01-10",
    lastUsed: "2024-01-15",
  },
  {
    id: "2",
    name: "Deprecated APIs",
    query: "deprecated",
    filters: {
      type: ["api"],
      category: [],
      status: ["deprecated"],
      tags: [],
      sortBy: "relevance",
    },
    createdAt: "2024-01-05",
    lastUsed: "2024-01-14",
  },
]

const sampleResults: SearchResult[] = [
  {
    id: "1",
    type: "api",
    title: "Stripe Payment API",
    description: "Complete payments platform for online businesses with webhook support and excellent documentation",
    url: "/marketplace/stripe",
    relevance: 95,
    category: "payment",
    tags: ["payments", "webhooks", "subscriptions"],
    date: format(new Date("2024-01-15"), "yyyy-MM-dd"),
    status: "active",
    highlighted: ["webhook", "payment"],
  },
  {
    id: "2",
    type: "tutorial",
    title: "Implementing Stripe Webhooks Securely",
    description: "Step-by-step guide to implementing and securing Stripe webhooks in your application",
    url: "/community/tutorials/stripe-webhooks",
    relevance: 88,
    category: "tutorial",
    tags: ["stripe", "webhooks", "security"],
    date: format(new Date("2024-01-12"), "yyyy-MM-dd"),
    author: "John Smith",
    highlighted: ["webhook", "Stripe"],
  },
  {
    id: "3",
    type: "discussion",
    title: "PayPal vs Stripe webhook reliability",
    description: "Community discussion comparing webhook reliability between PayPal and Stripe APIs",
    url: "/community/discussions/paypal-vs-stripe",
    relevance: 82,
    category: "discussion",
    tags: ["paypal", "stripe", "webhooks", "comparison"],
    date: format(new Date("2024-01-10"), "yyyy-MM-dd"),
    author: "Sarah Johnson",
    highlighted: ["webhook", "PayPal", "Stripe"],
  },
  {
    id: "4",
    type: "change",
    title: "Stripe API v2024-01-15 Released",
    description: "New version includes improved webhook delivery guarantees and enhanced fraud detection",
    url: "/changes/stripe-2024-01-15",
    relevance: 79,
    category: "change",
    tags: ["stripe", "api-update", "webhooks"],
    date: format(new Date("2024-01-15"), "yyyy-MM-dd"),
    status: "new",
    highlighted: ["webhook", "Stripe"],
  },
  {
    id: "5",
    type: "api",
    title: "PayPal Payments API",
    description: "PayPal's REST API for processing payments with webhook notifications",
    url: "/marketplace/paypal",
    relevance: 75,
    category: "payment",
    tags: ["payments", "webhooks", "paypal"],
    date: format(new Date("2024-01-01"), "yyyy-MM-dd"),
  },
]

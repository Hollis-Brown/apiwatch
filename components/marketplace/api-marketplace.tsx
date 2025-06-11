"use client"

import * as React from "react"
import {
  Search,
  Filter,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Tag,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

// Types
type ApiCategory =
  | "payment"
  | "communication"
  | "ai"
  | "social"
  | "developer"
  | "analytics"
  | "storage"
  | "authentication"

type ApiReview = {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  date: string
  helpful: number
  verified: boolean
}

type MarketplaceApi = {
  id: string
  name: string
  description: string
  category: ApiCategory
  logo: string
  rating: number
  reviewCount: number
  pricing: string
  pricingModel: "free" | "freemium" | "paid" | "enterprise"
  reliability: number
  popularity: number
  trending: boolean
  documentation: string
  website: string
  tags: string[]
  lastUpdated: string
  company: string
  alternatives: string[]
  reviews: ApiReview[]
  integrationDifficulty: "easy" | "medium" | "hard"
  uptime: number
  responseTime: number
}

// Sample data
const apiCategories: Record<ApiCategory, { name: string; icon: React.ElementType; color: string }> = {
  payment: { name: "Payment", icon: TrendingUp, color: "text-green-400" },
  communication: { name: "Communication", icon: Clock, color: "text-blue-400" },
  ai: { name: "AI & ML", icon: Star, color: "text-purple-400" },
  social: { name: "Social", icon: CheckCircle, color: "text-pink-400" },
  developer: { name: "Developer Tools", icon: AlertTriangle, color: "text-orange-400" },
  analytics: { name: "Analytics", icon: XCircle, color: "text-yellow-400" },
  storage: { name: "Storage", icon: Tag, color: "text-cyan-400" },
  authentication: { name: "Authentication", icon: ArrowRight, color: "text-red-400" },
}

const marketplaceApis: MarketplaceApi[] = [
  {
    id: "stripe",
    name: "Stripe API",
    description: "Complete payments platform for online businesses",
    category: "payment",
    logo: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    reviewCount: 1247,
    pricing: "$0.30 + 2.9% per transaction",
    pricingModel: "paid",
    reliability: 99.8,
    popularity: 98,
    trending: true,
    documentation: "https://stripe.com/docs/api",
    website: "https://stripe.com",
    tags: ["payments", "subscriptions", "invoicing"],
    lastUpdated: "2 days ago",
    company: "Stripe, Inc.",
    alternatives: ["paypal", "braintree", "adyen"],
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "John Smith",
        userAvatar: "/placeholder.svg",
        rating: 5,
        comment: "Excellent documentation and reliability. We've been using Stripe for years without issues.",
        date: "2024-01-15",
        helpful: 42,
        verified: true,
      },
    ],
    integrationDifficulty: "easy",
    uptime: 99.99,
    responseTime: 230,
  },
  {
    id: "twilio",
    name: "Twilio API",
    description: "Communication APIs for SMS, voice, and video",
    category: "communication",
    logo: "/placeholder.svg?height=40&width=40",
    rating: 4.6,
    reviewCount: 892,
    pricing: "Pay as you go",
    pricingModel: "paid",
    reliability: 99.5,
    popularity: 92,
    trending: true,
    documentation: "https://www.twilio.com/docs/api",
    website: "https://www.twilio.com",
    tags: ["sms", "voice", "video", "communication"],
    lastUpdated: "1 week ago",
    company: "Twilio Inc.",
    alternatives: ["messagebird", "vonage", "plivo"],
    reviews: [
      {
        id: "r2",
        userId: "u2",
        userName: "Sarah Johnson",
        userAvatar: "/placeholder.svg",
        rating: 4,
        comment: "Great service but pricing can add up quickly for high volume.",
        date: "2024-01-10",
        helpful: 28,
        verified: true,
      },
    ],
    integrationDifficulty: "medium",
    uptime: 99.95,
    responseTime: 310,
  },
  {
    id: "openai",
    name: "OpenAI API",
    description: "Advanced AI models for natural language processing",
    category: "ai",
    logo: "/placeholder.svg?height=40&width=40",
    rating: 4.7,
    reviewCount: 1056,
    pricing: "Pay per token",
    pricingModel: "paid",
    reliability: 99.2,
    popularity: 97,
    trending: true,
    documentation: "https://platform.openai.com/docs",
    website: "https://openai.com",
    tags: ["ai", "nlp", "machine learning", "gpt"],
    lastUpdated: "3 days ago",
    company: "OpenAI",
    alternatives: ["anthropic", "cohere", "huggingface"],
    reviews: [
      {
        id: "r3",
        userId: "u3",
        userName: "Mike Chen",
        userAvatar: "/placeholder.svg",
        rating: 5,
        comment: "Revolutionary technology with excellent API design. Changed how we build products.",
        date: "2024-01-05",
        helpful: 56,
        verified: true,
      },
    ],
    integrationDifficulty: "medium",
    uptime: 99.9,
    responseTime: 450,
  },
  {
    id: "github",
    name: "GitHub API",
    description: "Access GitHub data and integrate with GitHub features",
    category: "developer",
    logo: "/placeholder.svg?height=40&width=40",
    rating: 4.5,
    reviewCount: 782,
    pricing: "Free with rate limits, paid for higher limits",
    pricingModel: "freemium",
    reliability: 99.7,
    popularity: 94,
    trending: false,
    documentation: "https://docs.github.com/en/rest",
    website: "https://github.com",
    tags: ["git", "repositories", "code", "developer"],
    lastUpdated: "2 weeks ago",
    company: "GitHub (Microsoft)",
    alternatives: ["gitlab", "bitbucket", "gitea"],
    reviews: [
      {
        id: "r4",
        userId: "u4",
        userName: "Alex Wong",
        userAvatar: "/placeholder.svg",
        rating: 4,
        comment: "Solid API with good documentation. Rate limits can be restrictive on free tier.",
        date: "2023-12-20",
        helpful: 31,
        verified: true,
      },
    ],
    integrationDifficulty: "medium",
    uptime: 99.98,
    responseTime: 280,
  },
  {
    id: "twitter",
    name: "Twitter API",
    description: "Access Twitter data and functionality",
    category: "social",
    logo: "/placeholder.svg?height=40&width=40",
    rating: 3.2,
    reviewCount: 645,
    pricing: "Paid tiers",
    pricingModel: "paid",
    reliability: 97.5,
    popularity: 85,
    trending: false,
    documentation: "https://developer.twitter.com/en/docs",
    website: "https://twitter.com",
    tags: ["social media", "tweets", "timeline"],
    lastUpdated: "1 month ago",
    company: "Twitter (X Corp)",
    alternatives: ["mastodon", "bluesky", "threads"],
    reviews: [
      {
        id: "r5",
        userId: "u5",
        userName: "Emma Davis",
        userAvatar: "/placeholder.svg",
        rating: 2,
        comment: "Frequent changes to pricing and access. Hard to rely on for business use.",
        date: "2023-12-15",
        helpful: 89,
        verified: true,
      },
    ],
    integrationDifficulty: "hard",
    uptime: 99.5,
    responseTime: 520,
  },
  {
    id: "aws-s3",
    name: "AWS S3 API",
    description: "Cloud object storage with industry-leading scalability",
    category: "storage",
    logo: "/placeholder.svg?height=40&width=40",
    rating: 4.7,
    reviewCount: 1123,
    pricing: "Pay per use",
    pricingModel: "paid",
    reliability: 99.9,
    popularity: 96,
    trending: false,
    documentation: "https://docs.aws.amazon.com/s3/",
    website: "https://aws.amazon.com/s3/",
    tags: ["storage", "cloud", "aws", "object storage"],
    lastUpdated: "1 week ago",
    company: "Amazon Web Services",
    alternatives: ["google-cloud-storage", "azure-blob-storage", "backblaze"],
    reviews: [
      {
        id: "r6",
        userId: "u6",
        userName: "David Wilson",
        userAvatar: "/placeholder.svg",
        rating: 5,
        comment: "Rock solid reliability and excellent performance. Industry standard for a reason.",
        date: "2024-01-02",
        helpful: 47,
        verified: true,
      },
    ],
    integrationDifficulty: "medium",
    uptime: 99.99,
    responseTime: 180,
  },
  {
    id: "auth0",
    name: "Auth0 API",
    description: "Universal authentication & authorization platform",
    category: "authentication",
    logo: "/placeholder.svg?height=40&width=40",
    rating: 4.6,
    reviewCount: 876,
    pricing: "Free tier with paid plans",
    pricingModel: "freemium",
    reliability: 99.8,
    popularity: 91,
    trending: true,
    documentation: "https://auth0.com/docs/api",
    website: "https://auth0.com",
    tags: ["authentication", "authorization", "identity", "sso"],
    lastUpdated: "5 days ago",
    company: "Auth0 (Okta)",
    alternatives: ["firebase-auth", "cognito", "okta"],
    reviews: [
      {
        id: "r7",
        userId: "u7",
        userName: "Lisa Park",
        userAvatar: "/placeholder.svg",
        rating: 5,
        comment: "Simplified our auth implementation tremendously. Great documentation and SDKs.",
        date: "2023-12-28",
        helpful: 36,
        verified: true,
      },
    ],
    integrationDifficulty: "easy",
    uptime: 99.97,
    responseTime: 250,
  },
  {
    id: "google-analytics",
    name: "Google Analytics API",
    description: "Access to Google Analytics reporting data",
    category: "analytics",
    logo: "/placeholder.svg?height=40&width=40",
    rating: 4.3,
    reviewCount: 742,
    pricing: "Free with paid options",
    pricingModel: "freemium",
    reliability: 99.7,
    popularity: 93,
    trending: false,
    documentation: "https://developers.google.com/analytics",
    website: "https://analytics.google.com",
    tags: ["analytics", "reporting", "metrics", "google"],
    lastUpdated: "2 weeks ago",
    company: "Google",
    alternatives: ["mixpanel", "amplitude", "matomo"],
    reviews: [
      {
        id: "r8",
        userId: "u8",
        userName: "Ryan Thompson",
        userAvatar: "/placeholder.svg",
        rating: 4,
        comment: "Comprehensive data but API can be complex to work with initially.",
        date: "2023-12-10",
        helpful: 29,
        verified: true,
      },
    ],
    integrationDifficulty: "hard",
    uptime: 99.95,
    responseTime: 340,
  },
]

// Star Rating Component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
        />
      ))}
      <span className="ml-2 text-white font-medium">{rating.toFixed(1)}</span>
    </div>
  )
}

// API Card Component
function ApiCard({ api }: { api: MarketplaceApi }) {
  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 rounded-md">
              <AvatarImage src={api.logo || "/placeholder.svg"} alt={api.name} />
              <AvatarFallback className="bg-gray-700 rounded-md">{api.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-white text-lg">{api.name}</CardTitle>
              <CardDescription className="text-gray-400">{api.company}</CardDescription>
            </div>
          </div>
          {api.trending && (
            <Badge className="bg-blue-900/20 text-blue-400 border-blue-500/20">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{api.description}</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs">Reliability</span>
            <div className="flex items-center gap-1">
              <span className="text-green-400 text-xs font-medium">{api.reliability}%</span>
              <Progress value={api.reliability} className="h-1 w-16" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs">Integration</span>
            <Badge
              className={`text-xs ${
                api.integrationDifficulty === "easy"
                  ? "bg-green-900/20 text-green-400 border-green-500/20"
                  : api.integrationDifficulty === "medium"
                    ? "bg-yellow-900/20 text-yellow-400 border-yellow-500/20"
                    : "bg-red-900/20 text-red-400 border-red-500/20"
              }`}
            >
              {api.integrationDifficulty}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs">Pricing</span>
            <Badge
              className={`text-xs ${
                api.pricingModel === "free"
                  ? "bg-green-900/20 text-green-400 border-green-500/20"
                  : api.pricingModel === "freemium"
                    ? "bg-blue-900/20 text-blue-400 border-blue-500/20"
                    : "bg-purple-900/20 text-purple-400 border-purple-500/20"
              }`}
            >
              {api.pricingModel}
            </Badge>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-3">
          {api.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-400">
              {tag}
            </Badge>
          ))}
          {api.tags.length > 3 && (
            <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
              +{api.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <StarRating rating={api.rating} />
          <span className="text-gray-400 text-xs">({api.reviewCount})</span>
        </div>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

// API Marketplace Component
export function ApiMarketplace() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
  const [sortBy, setSortBy] = React.useState("popularity")

  // Filter and sort APIs
  const filteredApis = React.useMemo(() => {
    let result = marketplaceApis

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (api) =>
          api.name.toLowerCase().includes(query) ||
          api.description.toLowerCase().includes(query) ||
          api.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter((api) => api.category === selectedCategory)
    }

    // Apply sorting
    return result.sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.popularity - a.popularity
        case "rating":
          return b.rating - a.rating
        case "reliability":
          return b.reliability - a.reliability
        case "newest":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        default:
          return 0
      }
    })
  }, [searchQuery, selectedCategory, sortBy])

  // Get trending APIs
  const trendingApis = React.useMemo(() => {
    return marketplaceApis.filter((api) => api.trending).sort((a, b) => b.popularity - a.popularity)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">API Marketplace</h1>
          <p className="text-gray-400">Discover, compare, and integrate with thousands of APIs</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search APIs by name, description, or tags..."
            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="all">All Categories</SelectItem>
              {Object.entries(apiCategories).map(([key, { name }]) => (
                <SelectItem key={key} value={key}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="popularity">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="reliability">Most Reliable</SelectItem>
              <SelectItem value="newest">Recently Updated</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-gray-800 border-gray-700 text-white p-4">
              <div className="space-y-4">
                <h4 className="font-medium text-white">Advanced Filters</h4>
                <div className="space-y-2">
                  <h5 className="text-sm text-gray-400">Pricing Model</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="free" />
                      <label htmlFor="free" className="text-sm text-gray-300">
                        Free
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="freemium" />
                      <label htmlFor="freemium" className="text-sm text-gray-300">
                        Freemium
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="paid" />
                      <label htmlFor="paid" className="text-sm text-gray-300">
                        Paid
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm text-gray-400">Integration Difficulty</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="easy" />
                      <label htmlFor="easy" className="text-sm text-gray-300">
                        Easy
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="medium" />
                      <label htmlFor="medium" className="text-sm text-gray-300">
                        Medium
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hard" />
                      <label htmlFor="hard" className="text-sm text-gray-300">
                        Hard
                      </label>
                    </div>
                  </div>
                </div>
                <Separator className="bg-gray-700" />
                <div className="flex justify-between">
                  <Button variant="ghost" className="text-gray-400 hover:text-white">
                    Reset
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">Apply Filters</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* API Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(apiCategories).map(([key, { name, icon: Icon, color }]) => (
          <Card
            key={key}
            className={`bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors cursor-pointer ${
              selectedCategory === key ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setSelectedCategory(key === selectedCategory ? "all" : key)}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <div>
                <h3 className="font-medium text-white">{name}</h3>
                <p className="text-xs text-gray-400">
                  {marketplaceApis.filter((api) => api.category === key).length} APIs
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* API Listings */}
      <Tabs defaultValue="discover" className="w-full">
        <TabsList className="grid grid-cols-3 bg-gray-700 mb-6">
          <TabsTrigger value="discover" className="data-[state=active]:bg-gray-600">
            Discover
          </TabsTrigger>
          <TabsTrigger value="trending" className="data-[state=active]:bg-gray-600">
            Trending
          </TabsTrigger>
          <TabsTrigger value="recommended" className="data-[state=active]:bg-gray-600">
            Recommended
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          {filteredApis.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApis.map((api) => (
                <ApiCard key={api.id} api={api} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No APIs found matching your criteria.</p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
                className="text-blue-400"
              >
                Clear filters
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingApis.map((api) => (
              <ApiCard key={api.id} api={api} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommended" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketplaceApis
              .filter((api) => api.rating > 4.5)
              .slice(0, 3)
              .map((api) => (
                <ApiCard key={api.id} api={api} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

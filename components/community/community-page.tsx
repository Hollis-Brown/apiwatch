"use client"

import * as React from "react"
import {
  MessageSquare,
  Users,
  TrendingUp,
  Star,
  Clock,
  ThumbsUp,
  MessageCircle,
  Award,
  Crown,
  Trophy,
  Medal,
  BadgeIcon,
  Search,
  Plus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Types
type ForumCategory = "help" | "news" | "general" | "showcase" | "feedback"

type ForumPost = {
  id: string
  title: string
  content: string
  category: ForumCategory
  author: {
    id: string
    name: string
    avatar?: string
    reputation: number
    badges: string[]
  }
  createdAt: string
  updatedAt: string
  replies: number
  views: number
  likes: number
  tags: string[]
  pinned?: boolean
  solved?: boolean
}

type CommunityMember = {
  id: string
  name: string
  avatar?: string
  reputation: number
  badges: string[]
  contributions: number
  joinedAt: string
  lastActive: string
  specialties: string[]
}

type ContributionType = "api_report" | "code_example" | "tutorial" | "bug_report" | "feature_request"

type Contribution = {
  id: string
  type: ContributionType
  title: string
  description: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  createdAt: string
  votes: number
  status: "pending" | "approved" | "rejected"
  apiName?: string
}

// Sample data
const forumCategories: Record<
  ForumCategory,
  { name: string; description: string; icon: React.ElementType; color: string }
> = {
  help: {
    name: "Help & Support",
    description: "Get help with API integrations",
    icon: MessageSquare,
    color: "text-blue-400",
  },
  news: {
    name: "API News",
    description: "Latest updates and announcements",
    icon: TrendingUp,
    color: "text-green-400",
  },
  general: { name: "General Discussion", description: "Community discussions", icon: Users, color: "text-purple-400" },
  showcase: { name: "Showcase", description: "Show off your projects", icon: Star, color: "text-yellow-400" },
  feedback: { name: "Feedback", description: "Suggest improvements", icon: MessageCircle, color: "text-orange-400" },
}

const forumPosts: ForumPost[] = [
  {
    id: "1",
    title: "Stripe webhook verification failing intermittently",
    content: "I'm having issues with Stripe webhook verification. It works most of the time but fails randomly...",
    category: "help",
    author: {
      id: "u1",
      name: "John Smith",
      avatar: "/placeholder.svg",
      reputation: 1250,
      badges: ["Helper", "Early Adopter"],
    },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T14:20:00Z",
    replies: 8,
    views: 156,
    likes: 12,
    tags: ["stripe", "webhooks", "verification"],
    solved: true,
  },
  {
    id: "2",
    title: "OpenAI API rate limits increased for GPT-4",
    content: "Great news! OpenAI has increased the rate limits for GPT-4 API calls...",
    category: "news",
    author: {
      id: "u2",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      reputation: 2100,
      badges: ["News Reporter", "API Expert", "Top Contributor"],
    },
    createdAt: "2024-01-14T16:45:00Z",
    updatedAt: "2024-01-14T16:45:00Z",
    replies: 23,
    views: 892,
    likes: 67,
    tags: ["openai", "gpt-4", "rate-limits"],
    pinned: true,
  },
  {
    id: "3",
    title: "Best practices for handling API deprecations",
    content: "What are your strategies for managing API deprecations in production systems?",
    category: "general",
    author: {
      id: "u3",
      name: "Mike Chen",
      avatar: "/placeholder.svg",
      reputation: 890,
      badges: ["Contributor"],
    },
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-14T11:30:00Z",
    replies: 15,
    views: 234,
    likes: 28,
    tags: ["deprecation", "best-practices", "production"],
  },
  {
    id: "4",
    title: "Built a real-time API monitoring dashboard",
    content: "Just finished building a real-time dashboard for monitoring multiple APIs. Here's what I learned...",
    category: "showcase",
    author: {
      id: "u4",
      name: "Alex Wong",
      avatar: "/placeholder.svg",
      reputation: 1560,
      badges: ["Builder", "Innovator"],
    },
    createdAt: "2024-01-12T14:20:00Z",
    updatedAt: "2024-01-12T14:20:00Z",
    replies: 19,
    views: 445,
    likes: 52,
    tags: ["dashboard", "monitoring", "real-time"],
  },
  {
    id: "5",
    title: "Feature request: API change prediction",
    content: "Would love to see AI-powered predictions for when APIs might change or deprecate features...",
    category: "feedback",
    author: {
      id: "u5",
      name: "Emma Davis",
      avatar: "/placeholder.svg",
      reputation: 720,
      badges: ["Feedback Champion"],
    },
    createdAt: "2024-01-11T11:45:00Z",
    updatedAt: "2024-01-11T11:45:00Z",
    replies: 31,
    views: 678,
    likes: 89,
    tags: ["feature-request", "ai", "prediction"],
  },
]

const topMembers: CommunityMember[] = [
  {
    id: "u1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg",
    reputation: 2100,
    badges: ["News Reporter", "API Expert", "Top Contributor"],
    contributions: 156,
    joinedAt: "2023-03-15",
    lastActive: "2024-01-15T16:30:00Z",
    specialties: ["OpenAI", "Stripe", "AWS"],
  },
  {
    id: "u2",
    name: "Alex Wong",
    avatar: "/placeholder.svg",
    reputation: 1560,
    badges: ["Builder", "Innovator"],
    contributions: 89,
    joinedAt: "2023-05-20",
    lastActive: "2024-01-15T14:20:00Z",
    specialties: ["Real-time APIs", "WebSockets", "GraphQL"],
  },
  {
    id: "u3",
    name: "John Smith",
    avatar: "/placeholder.svg",
    reputation: 1250,
    badges: ["Helper", "Early Adopter"],
    contributions: 67,
    joinedAt: "2023-02-10",
    lastActive: "2024-01-15T12:15:00Z",
    specialties: ["Payment APIs", "Webhooks", "Security"],
  },
  {
    id: "u4",
    name: "Mike Chen",
    avatar: "/placeholder.svg",
    reputation: 890,
    badges: ["Contributor"],
    contributions: 45,
    joinedAt: "2023-07-08",
    lastActive: "2024-01-14T18:45:00Z",
    specialties: ["DevOps", "Monitoring", "Performance"],
  },
  {
    id: "u5",
    name: "Emma Davis",
    avatar: "/placeholder.svg",
    reputation: 720,
    badges: ["Feedback Champion"],
    contributions: 34,
    joinedAt: "2023-09-12",
    lastActive: "2024-01-14T10:30:00Z",
    specialties: ["UX", "Product", "Analytics"],
  },
]

const recentContributions: Contribution[] = [
  {
    id: "c1",
    type: "api_report",
    title: "Twitter API v2 endpoint returning 429 errors",
    description: "Multiple users reporting increased rate limiting on the user lookup endpoint",
    author: {
      id: "u1",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
    },
    createdAt: "2024-01-15T14:30:00Z",
    votes: 23,
    status: "approved",
    apiName: "Twitter API",
  },
  {
    id: "c2",
    type: "code_example",
    title: "Stripe webhook signature verification in Node.js",
    description: "Complete example with error handling and best practices",
    author: {
      id: "u2",
      name: "John Smith",
      avatar: "/placeholder.svg",
    },
    createdAt: "2024-01-15T11:20:00Z",
    votes: 18,
    status: "approved",
    apiName: "Stripe API",
  },
  {
    id: "c3",
    type: "tutorial",
    title: "Migrating from OpenAI v3 to v4",
    description: "Step-by-step guide with code examples and common pitfalls",
    author: {
      id: "u3",
      name: "Alex Wong",
      avatar: "/placeholder.svg",
    },
    createdAt: "2024-01-14T16:45:00Z",
    votes: 34,
    status: "approved",
    apiName: "OpenAI API",
  },
]

// Badge Component
function UserBadge({ badge }: { badge: string }) {
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Top Contributor":
        return "bg-purple-900/20 text-purple-400 border-purple-500/20"
      case "API Expert":
        return "bg-blue-900/20 text-blue-400 border-blue-500/20"
      case "News Reporter":
        return "bg-green-900/20 text-green-400 border-green-500/20"
      case "Helper":
        return "bg-yellow-900/20 text-yellow-400 border-yellow-500/20"
      case "Early Adopter":
        return "bg-orange-900/20 text-orange-400 border-orange-500/20"
      default:
        return "bg-gray-900/20 text-gray-400 border-gray-500/20"
    }
  }

  return <Badge className={`text-xs ${getBadgeColor(badge)}`}>{badge}</Badge>
}

// Forum Post Card
function ForumPostCard({ post }: { post: ForumPost }) {
  const categoryInfo = forumCategories[post.category]
  const Icon = categoryInfo.icon

  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-gray-700">{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {post.pinned && <Badge className="bg-blue-900/20 text-blue-400 border-blue-500/20 text-xs">Pinned</Badge>}
              {post.solved && (
                <Badge className="bg-green-900/20 text-green-400 border-green-500/20 text-xs">Solved</Badge>
              )}
              <Badge
                className={`text-xs ${categoryInfo.color.replace("text-", "bg-").replace("-400", "-900/20")} ${categoryInfo.color} border-${categoryInfo.color.split("-")[1]}-500/20`}
              >
                <Icon className="h-3 w-3 mr-1" />
                {categoryInfo.name}
              </Badge>
            </div>
            <h3 className="font-medium text-white mb-2 line-clamp-2">{post.title}</h3>
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">{post.content}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-400">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  <span>{post.replies}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{post.author.name}</span>
                <span className="text-xs text-purple-400">{post.author.reputation}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Member Card
function MemberCard({ member }: { member: CommunityMember }) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={member.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-gray-700">{member.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-medium text-white">{member.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-purple-400">{member.reputation} rep</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-400">{member.contributions} contributions</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {member.badges.slice(0, 2).map((badge) => (
            <UserBadge key={badge} badge={badge} />
          ))}
          {member.badges.length > 2 && (
            <Badge className="text-xs bg-gray-700 text-gray-400">+{member.badges.length - 2}</Badge>
          )}
        </div>
        <div className="text-xs text-gray-400">
          Specializes in: {member.specialties.slice(0, 2).join(", ")}
          {member.specialties.length > 2 && ` +${member.specialties.length - 2} more`}
        </div>
      </CardContent>
    </Card>
  )
}

// Contribution Card
function ContributionCard({ contribution }: { contribution: Contribution }) {
  const getTypeIcon = (type: ContributionType) => {
    switch (type) {
      case "api_report":
        return <TrendingUp className="h-4 w-4" />
      case "code_example":
        return <MessageSquare className="h-4 w-4" />
      case "tutorial":
        return <Star className="h-4 w-4" />
      case "bug_report":
        return <MessageCircle className="h-4 w-4" />
      case "feature_request":
        return <Users className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: ContributionType) => {
    switch (type) {
      case "api_report":
        return "text-red-400"
      case "code_example":
        return "text-blue-400"
      case "tutorial":
        return "text-green-400"
      case "bug_report":
        return "text-orange-400"
      case "feature_request":
        return "text-purple-400"
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={`w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center ${getTypeColor(contribution.type)}`}
          >
            {getTypeIcon(contribution.type)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-white text-sm">{contribution.title}</h3>
              <Badge
                className={`text-xs ${
                  contribution.status === "approved"
                    ? "bg-green-900/20 text-green-400 border-green-500/20"
                    : contribution.status === "pending"
                      ? "bg-yellow-900/20 text-yellow-400 border-yellow-500/20"
                      : "bg-red-900/20 text-red-400 border-red-500/20"
                }`}
              >
                {contribution.status}
              </Badge>
            </div>
            <p className="text-gray-400 text-xs mb-2 line-clamp-2">{contribution.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={contribution.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gray-700 text-xs">{contribution.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-400">{contribution.author.name}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <ThumbsUp className="h-3 w-3" />
                <span>{contribution.votes}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Community Page Component
export function CommunityPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")

  // Filter posts
  const filteredPosts = React.useMemo(() => {
    let result = forumPosts

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    if (selectedCategory !== "all") {
      result = result.filter((post) => post.category === selectedCategory)
    }

    return result.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Community</h1>
          <p className="text-gray-400">Connect with developers, share knowledge, and get help</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">2,847</div>
            <div className="text-sm text-gray-400">Active Members</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">1,234</div>
            <div className="text-sm text-gray-400">Discussions</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">567</div>
            <div className="text-sm text-gray-400">Code Examples</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">89</div>
            <div className="text-sm text-gray-400">APIs Tracked</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="discussions" className="w-full">
        <TabsList className="grid grid-cols-4 bg-gray-700">
          <TabsTrigger value="discussions" className="data-[state=active]:bg-gray-600">
            Discussions
          </TabsTrigger>
          <TabsTrigger value="members" className="data-[state=active]:bg-gray-600">
            Members
          </TabsTrigger>
          <TabsTrigger value="contributions" className="data-[state=active]:bg-gray-600">
            Contributions
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="data-[state=active]:bg-gray-600">
            Leaderboard
          </TabsTrigger>
        </TabsList>

        {/* Discussions Tab */}
        <TabsContent value="discussions" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search discussions..."
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px] bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">All Categories</SelectItem>
                {Object.entries(forumCategories).map(([key, { name }]) => (
                  <SelectItem key={key} value={key}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Forum Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(forumCategories).map(([key, { name, description, icon: Icon, color }]) => (
              <Card
                key={key}
                className={`bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors cursor-pointer ${
                  selectedCategory === key ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedCategory(key === selectedCategory ? "all" : key)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                      <Icon className={`h-5 w-5 ${color}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{name}</h3>
                      <p className="text-xs text-gray-400">
                        {forumPosts.filter((post) => post.category === key).length} posts
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Forum Posts */}
          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => <ForumPostCard key={post.id} post={post} />)
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No discussions found matching your criteria.</p>
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
          </div>
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </TabsContent>

        {/* Contributions Tab */}
        <TabsContent value="contributions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentContributions.map((contribution) => (
              <ContributionCard key={contribution.id} contribution={contribution} />
            ))}
          </div>
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Contributors */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Top Contributors
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Members with the highest reputation this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topMembers.slice(0, 5).map((member, index) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          index === 0
                            ? "bg-yellow-900/20 text-yellow-400"
                            : index === 1
                              ? "bg-gray-600 text-gray-300"
                              : index === 2
                                ? "bg-orange-900/20 text-orange-400"
                                : "bg-gray-700 text-gray-400"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gray-700">{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-white">{member.name}</div>
                        <div className="text-xs text-gray-400">{member.reputation} reputation</div>
                      </div>
                      {index < 3 && (
                        <div className="text-right">
                          {index === 0 && <Crown className="h-4 w-4 text-yellow-400" />}
                          {index === 1 && <Medal className="h-4 w-4 text-gray-400" />}
                          {index === 2 && <BadgeIcon className="h-4 w-4 text-orange-400" />}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-400" />
                  Recent Achievements
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Latest badges and milestones earned by community members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-gray-700">SJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-white">Sarah Johnson</div>
                      <div className="text-xs text-gray-400">Earned "API Expert" badge</div>
                    </div>
                    <Badge className="bg-blue-900/20 text-blue-400 border-blue-500/20 text-xs">API Expert</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-gray-700">AW</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-white">Alex Wong</div>
                      <div className="text-xs text-gray-400">Reached 1000 reputation</div>
                    </div>
                    <Badge className="bg-purple-900/20 text-purple-400 border-purple-500/20 text-xs">1K Rep</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-gray-700">JS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-white">John Smith</div>
                      <div className="text-xs text-gray-400">Earned "Helper" badge</div>
                    </div>
                    <Badge className="bg-yellow-900/20 text-yellow-400 border-yellow-500/20 text-xs">Helper</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

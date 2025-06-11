"use client"

import * as React from "react"
import {
  Star,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ThumbsUp,
  MessageSquare,
  Code,
  Copy,
  Check,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

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

// Code Example Component
function CodeExample({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = React.useState(false)
  const { toast } = useToast()

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Code example copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-gray-900 px-4 py-2 rounded-t-lg">
        <span className="text-sm text-gray-400">{language}</span>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 w-8 p-0">
          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-gray-400" />}
        </Button>
      </div>
      <pre className="bg-gray-900 p-4 rounded-b-lg overflow-x-auto text-sm text-gray-300 font-mono">{code}</pre>
    </div>
  )
}

// API Detail Component
export function ApiDetail({ apiId }: { apiId: string }) {
  const [rating, setRating] = React.useState(0)
  const [review, setReview] = React.useState("")
  const { toast } = useToast()

  // Sample API data (in a real app, this would be fetched based on apiId)
  const api = {
    id: "stripe",
    name: "Stripe API",
    description: "Complete payments platform for online businesses",
    category: "payment",
    logo: "/placeholder.svg?height=80&width=80",
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
    alternatives: ["PayPal API", "Braintree API", "Adyen API"],
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "John Smith",
        userAvatar: "/placeholder.svg",
        rating: 5,
        comment:
          "Excellent documentation and reliability. We've been using Stripe for years without issues. Their support team is also very responsive when we've had questions.",
        date: "2024-01-15",
        helpful: 42,
        verified: true,
      },
      {
        id: "r2",
        userId: "u2",
        userName: "Sarah Johnson",
        userAvatar: "/placeholder.svg",
        rating: 4,
        comment:
          "Great API overall, but the webhook testing could be improved. Otherwise, the documentation is clear and the SDKs are well-maintained.",
        date: "2024-01-10",
        helpful: 28,
        verified: true,
      },
    ],
    integrationDifficulty: "easy",
    uptime: 99.99,
    responseTime: 230,
    features: [
      "Payment processing",
      "Subscription management",
      "Invoicing",
      "Fraud prevention",
      "Global payments",
      "Webhook notifications",
    ],
    sdks: ["JavaScript", "Python", "Ruby", "PHP", "Java", "Go", ".NET", "iOS", "Android"],
    codeExamples: {
      javascript: `import Stripe from 'stripe';
const stripe = new Stripe('sk_test_...');

// Create a payment intent
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000, // $20.00
  currency: 'usd',
  payment_method_types: ['card'],
  metadata: { order_id: '6735' }
});

console.log(paymentIntent.client_secret);`,
      python: `import stripe
stripe.api_key = "sk_test_..."

# Create a payment intent
payment_intent = stripe.PaymentIntent.create(
  amount=2000,  # $20.00
  currency="usd",
  payment_method_types=["card"],
  metadata={"order_id": "6735"}
)

print(payment_intent.client_secret)`,
    },
    changeHistory: [
      {
        date: "2024-01-15",
        type: "Feature",
        description: "Added support for Apple Pay on the web",
        impact: "low",
      },
      {
        date: "2023-12-10",
        type: "Update",
        description: "Improved webhook reliability and delivery guarantees",
        impact: "medium",
      },
      {
        date: "2023-11-05",
        type: "Deprecation",
        description: "Legacy API endpoints will be removed on June 1, 2024",
        impact: "high",
      },
    ],
    stats: {
      dailyRequests: "250M+",
      averageLatency: "230ms",
      successRate: "99.99%",
      developers: "2M+",
      countries: "40+",
    },
  }

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting your review",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Review submitted",
      description: "Thank you for sharing your experience with this API",
    })

    // Reset form
    setRating(0)
    setReview("")
  }

  const handleHelpful = (reviewId: string) => {
    toast({
      title: "Marked as helpful",
      description: "Thank you for your feedback",
    })
  }

  return (
    <div className="space-y-6">
      {/* API Header */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <Avatar className="h-20 w-20 rounded-lg">
            <AvatarImage src={api.logo || "/placeholder.svg"} alt={api.name} />
            <AvatarFallback className="bg-gray-700 rounded-lg text-2xl">{api.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{api.name}</h1>
              {api.trending && <Badge className="bg-blue-900/20 text-blue-400 border-blue-500/20">Trending</Badge>}
            </div>
            <p className="text-gray-300 mb-3">{api.description}</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-1">
                <StarRating rating={api.rating} />
                <span className="text-gray-400">({api.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Clock className="h-4 w-4" />
                <span>Updated {api.lastUpdated}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Shield className="h-4 w-4" />
                <span>{api.company}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <Button className="bg-blue-600 hover:bg-blue-700">Start Monitoring</Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Website
            </Button>
          </div>
        </div>
      </div>

      {/* API Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-4 bg-gray-700">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gray-600">
                Overview
              </TabsTrigger>
              <TabsTrigger value="integration" className="data-[state=active]:bg-gray-600">
                Integration
              </TabsTrigger>
              <TabsTrigger value="changes" className="data-[state=active]:bg-gray-600">
                Changes
              </TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-gray-600">
                Reviews
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {api.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Performance & Reliability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-700/30 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-white">{api.stats.dailyRequests}</div>
                      <div className="text-xs text-gray-400">Daily Requests</div>
                    </div>
                    <div className="bg-gray-700/30 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-white">{api.stats.averageLatency}</div>
                      <div className="text-xs text-gray-400">Avg. Latency</div>
                    </div>
                    <div className="bg-gray-700/30 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-white">{api.stats.successRate}</div>
                      <div className="text-xs text-gray-400">Success Rate</div>
                    </div>
                    <div className="bg-gray-700/30 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-white">{api.stats.developers}</div>
                      <div className="text-xs text-gray-400">Developers</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Uptime</span>
                        <span className="text-green-400">{api.uptime}%</span>
                      </div>
                      <Progress value={api.uptime} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Response Time</span>
                        <span className="text-blue-400">{api.responseTime}ms</span>
                      </div>
                      <Progress
                        value={100 - (api.responseTime / 1000) * 100}
                        className="h-2 bg-gray-700 [&>div]:bg-blue-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Reliability Score</span>
                        <span className="text-purple-400">{api.reliability}%</span>
                      </div>
                      <Progress value={api.reliability} className="h-2 bg-gray-700 [&>div]:bg-purple-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Alternatives</CardTitle>
                  <CardDescription className="text-gray-400">Similar APIs you might consider</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {api.alternatives.map((alt) => (
                      <Card key={alt} className="bg-gray-700 border-gray-600">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 rounded-md">
                              <AvatarFallback className="bg-gray-600 rounded-md text-xs">
                                {alt.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-white">{alt}</div>
                              <div className="text-xs text-gray-400">Alternative</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Integration Tab */}
            <TabsContent value="integration" className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Integration Difficulty</CardTitle>
                  <CardDescription className="text-gray-400">
                    How easy it is to integrate this API into your application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        api.integrationDifficulty === "easy"
                          ? "bg-green-900/20 text-green-400"
                          : api.integrationDifficulty === "medium"
                            ? "bg-yellow-900/20 text-yellow-400"
                            : "bg-red-900/20 text-red-400"
                      }`}
                    >
                      {api.integrationDifficulty === "easy" ? (
                        <CheckCircle className="h-8 w-8" />
                      ) : api.integrationDifficulty === "medium" ? (
                        <AlertTriangle className="h-8 w-8" />
                      ) : (
                        <XCircle className="h-8 w-8" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white capitalize">{api.integrationDifficulty}</h3>
                      <p className="text-gray-400">
                        {api.integrationDifficulty === "easy"
                          ? "This API is straightforward to integrate with clear documentation and helpful SDKs."
                          : api.integrationDifficulty === "medium"
                            ? "This API requires some technical knowledge but has good documentation."
                            : "This API has a steep learning curve and may require significant development effort."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Available SDKs</CardTitle>
                  <CardDescription className="text-gray-400">
                    Official libraries to help you integrate faster
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {api.sdks.map((sdk) => (
                      <Badge key={sdk} className="bg-gray-700 text-gray-300">
                        {sdk}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Code Examples</CardTitle>
                  <CardDescription className="text-gray-400">
                    Sample code to help you get started quickly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs defaultValue="javascript" className="w-full">
                    <TabsList className="bg-gray-700">
                      {Object.keys(api.codeExamples).map((lang) => (
                        <TabsTrigger key={lang} value={lang} className="data-[state=active]:bg-gray-600">
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {Object.entries(api.codeExamples).map(([lang, code]) => (
                      <TabsContent key={lang} value={lang}>
                        <CodeExample language={lang} code={code} />
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Community Resources</CardTitle>
                  <CardDescription className="text-gray-400">Helpful resources shared by the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-700/30 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Code className="h-5 w-5 text-blue-400" />
                        <h3 className="font-medium text-white">Integration Tutorial</h3>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">
                        Step-by-step guide to integrating {api.name} with React and Node.js
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-gray-600 text-xs">JS</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-gray-400">By John Smith</span>
                        </div>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          View
                        </Button>
                      </div>
                    </div>

                    <div className="bg-gray-700/30 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="h-5 w-5 text-green-400" />
                        <h3 className="font-medium text-white">Common Pitfalls & Solutions</h3>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">
                        A collection of common issues and their solutions when working with {api.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-gray-600 text-xs">SJ</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-gray-400">By Sarah Johnson</span>
                        </div>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Changes Tab */}
            <TabsContent value="changes" className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Changes</CardTitle>
                  <CardDescription className="text-gray-400">
                    History of updates, changes, and deprecations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {api.changeHistory.map((change, index) => (
                      <div key={index} className="relative pl-6 pb-6">
                        {/* Timeline connector */}
                        {index < api.changeHistory.length - 1 && (
                          <div className="absolute left-2.5 top-3 h-full w-px bg-gray-700" />
                        )}
                        {/* Timeline dot */}
                        <div
                          className={`absolute left-0 top-1 h-5 w-5 rounded-full flex items-center justify-center ${
                            change.impact === "high"
                              ? "bg-red-900/20 text-red-400"
                              : change.impact === "medium"
                                ? "bg-yellow-900/20 text-yellow-400"
                                : "bg-green-900/20 text-green-400"
                          }`}
                        >
                          {change.impact === "high" ? (
                            <XCircle className="h-3 w-3" />
                          ) : change.impact === "medium" ? (
                            <AlertTriangle className="h-3 w-3" />
                          ) : (
                            <CheckCircle className="h-3 w-3" />
                          )}
                        </div>
                        {/* Content */}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              className={
                                change.type === "Deprecation"
                                  ? "bg-red-900/20 text-red-400 border-red-500/20"
                                  : change.type === "Update"
                                    ? "bg-yellow-900/20 text-yellow-400 border-yellow-500/20"
                                    : "bg-green-900/20 text-green-400 border-green-500/20"
                              }
                            >
                              {change.type}
                            </Badge>
                            <span className="text-gray-400 text-sm">{change.date}</span>
                          </div>
                          <p className="text-gray-300">{change.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Community Reports</CardTitle>
                  <CardDescription className="text-gray-400">
                    Changes reported by the community before official announcements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      <h3 className="font-medium text-white">Rate Limit Changes Spotted</h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">
                      Several users have reported seeing reduced rate limits in the test environment. This might
                      indicate upcoming changes to production limits.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-gray-600 text-xs">MC</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-400">Reported by Mike Chen • 3 days ago</span>
                      </div>
                      <Badge className="bg-blue-900/20 text-blue-400 border-blue-500/20">Unconfirmed</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Write a Review</CardTitle>
                  <CardDescription className="text-gray-400">Share your experience with this API</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-2">Your Rating</div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} onClick={() => setRating(star)} className="focus:outline-none">
                            <Star
                              className={`h-6 w-6 ${
                                star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-2">Your Review</div>
                      <Textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Share your experience with this API..."
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 min-h-32"
                      />
                    </div>
                    <Button onClick={handleSubmitReview} className="bg-blue-600 hover:bg-blue-700">
                      Submit Review
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">User Reviews</CardTitle>
                  <CardDescription className="text-gray-400">
                    {api.reviewCount} reviews from the community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {api.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-700 pb-6 last:border-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={review.userAvatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-gray-700">{review.userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-white">{review.userName}</span>
                                {review.verified && (
                                  <Badge className="bg-green-900/20 text-green-400 border-green-500/20 text-xs">
                                    Verified User
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-gray-400">{review.date}</div>
                            </div>
                          </div>
                          <StarRating rating={review.rating} />
                        </div>
                        <p className="text-gray-300 mb-3">{review.comment}</p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleHelpful(review.id)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs"
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Helpful ({review.helpful})
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">API Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">Pricing</div>
                <div className="text-white">{api.pricing}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Documentation</div>
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700" asChild>
                  <a href={api.documentation} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Docs
                  </a>
                </Button>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Tags</div>
                <div className="flex flex-wrap gap-1">
                  {api.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-400">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Uptime</span>
                <span className="text-green-400 font-medium">{api.uptime}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Avg. Response</span>
                <span className="text-blue-400 font-medium">{api.responseTime}ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Popularity</span>
                <span className="text-purple-400 font-medium">{api.popularity}/100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Integration</span>
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
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Community Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Discussions</span>
                <span className="text-white font-medium">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Contributors</span>
                <span className="text-white font-medium">23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Code Examples</span>
                <span className="text-white font-medium">12</span>
              </div>
              <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                Join Discussion
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

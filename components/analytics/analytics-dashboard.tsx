"use client"

import * as React from "react"
import { BarChart3, Calendar, Download, Filter, LineChart, PieChart, RefreshCw, Zap } from "lucide-react"
import { subDays, subMonths } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

import { ApiPerformanceChart } from "./api-performance-chart"
import { ApiChangeHeatmap } from "./api-change-heatmap"
import { ApiRiskRadar } from "./api-risk-radar"
import { ApiUptimeChart } from "./api-uptime-chart"
import { ApiCallVolumeChart } from "./api-call-volume-chart"
import { ApiDependencyGraph } from "./api-dependency-graph"
import { ApiPredictiveChart } from "./api-predictive-chart"
import { ApiErrorRateChart } from "./api-error-rate-chart"
import { ApiCategoryDistribution } from "./api-category-distribution"
import { PaywallOverlay } from "../paywall-overlay"

// Types
import type { User } from "../../types"

interface AnalyticsDashboardProps {
  user: User
  onUpgrade: () => void
}

export function AnalyticsDashboard({ user, onUpgrade }: AnalyticsDashboardProps) {
  const [dateRange, setDateRange] = React.useState("30d")
  const [isGeneratingReport, setIsGeneratingReport] = React.useState(false)
  const [selectedApis, setSelectedApis] = React.useState<string[]>(["all"])
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(["all"])
  const [selectedRiskLevels, setSelectedRiskLevels] = React.useState<string[]>(["all"])

  // Date range options
  const dateRanges = {
    "7d": {
      label: "Last 7 days",
      start: subDays(new Date(), 7),
      end: new Date(),
    },
    "30d": {
      label: "Last 30 days",
      start: subDays(new Date(), 30),
      end: new Date(),
    },
    "90d": {
      label: "Last 90 days",
      start: subDays(new Date(), 90),
      end: new Date(),
    },
    "6m": {
      label: "Last 6 months",
      start: subMonths(new Date(), 6),
      end: new Date(),
    },
    "1y": {
      label: "Last year",
      start: subMonths(new Date(), 12),
      end: new Date(),
    },
  }

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true)
    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGeneratingReport(false)
    // In a real app, this would trigger a download or open a new tab
    window.open("#", "_blank")
  }

  const isProFeature = user.plan === "free"
  const isEnterpriseFeature = user.plan === "free" || user.plan === "pro"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-gray-400">Comprehensive insights into your API ecosystem</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {Object.entries(dateRanges).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
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
                <h4 className="font-medium text-white">Filter Analytics</h4>
                <div className="space-y-2">
                  <Label className="text-gray-400">APIs</Label>
                  <Select value={selectedApis[0]} onValueChange={(value) => setSelectedApis([value])}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all">All APIs</SelectItem>
                      <SelectItem value="stripe">Stripe Payment API</SelectItem>
                      <SelectItem value="twilio">Twilio SMS API</SelectItem>
                      <SelectItem value="github">GitHub REST API</SelectItem>
                      <SelectItem value="openai">OpenAI GPT API</SelectItem>
                      <SelectItem value="twitter">Twitter API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400">Categories</Label>
                  <Select value={selectedCategories[0]} onValueChange={(value) => setSelectedCategories([value])}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="payment">Payment</SelectItem>
                      <SelectItem value="communication">Communication</SelectItem>
                      <SelectItem value="developer">Developer Tools</SelectItem>
                      <SelectItem value="ai">AI & ML</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400">Risk Level</Label>
                  <Select value={selectedRiskLevels[0]} onValueChange={(value) => setSelectedRiskLevels([value])}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all">All Risk Levels</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="low">Low Risk</SelectItem>
                    </SelectContent>
                  </Select>
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
          <Button
            onClick={handleGenerateReport}
            disabled={isGeneratingReport || isProFeature}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isGeneratingReport ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Export Report
          </Button>
        </div>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid grid-cols-4 bg-gray-700 mb-6">
          <TabsTrigger value="performance" className="data-[state=active]:bg-gray-600">
            Performance
          </TabsTrigger>
          <TabsTrigger value="changes" className="data-[state=active]:bg-gray-600">
            Change Patterns
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="data-[state=active]:bg-gray-600">
            Portfolio Health
          </TabsTrigger>
          <TabsTrigger value="predictions" className="data-[state=active]:bg-gray-600">
            Predictions
          </TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700 col-span-3 md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">API Response Time</CardTitle>
                <CardDescription className="text-gray-400">Average response time in milliseconds</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ApiPerformanceChart />
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Uptime</CardTitle>
                <CardDescription className="text-gray-400">API availability percentage</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ApiUptimeChart />
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Error Rates</CardTitle>
                <CardDescription className="text-gray-400">Percentage of failed API calls</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ApiErrorRateChart />
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 col-span-3 md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">API Call Volume</CardTitle>
                <CardDescription className="text-gray-400">Number of API calls over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ApiCallVolumeChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Change Patterns Tab */}
        <TabsContent value="changes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700 col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">API Change Frequency Heatmap</CardTitle>
                <CardDescription className="text-gray-400">
                  Visualizing which APIs change most frequently
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ApiChangeHeatmap />
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 col-span-3 md:col-span-2 relative">
              {isProFeature && <PaywallOverlay feature="Seasonal pattern analysis" onUpgrade={onUpgrade} />}
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">Seasonal Change Patterns</CardTitle>
                    <CardDescription className="text-gray-400">
                      When APIs typically update throughout the year
                    </CardDescription>
                  </div>
                  {isProFeature && (
                    <Badge className="bg-yellow-900/20 text-yellow-400 border-yellow-500/20">Pro Feature</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex items-center justify-center h-full">
                  <LineChart className="h-32 w-32 text-gray-500 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 relative">
              {isProFeature && <PaywallOverlay feature="Industry trend analysis" onUpgrade={onUpgrade} />}
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">Industry Trends</CardTitle>
                    <CardDescription className="text-gray-400">Volatility by API category</CardDescription>
                  </div>
                  {isProFeature && (
                    <Badge className="bg-yellow-900/20 text-yellow-400 border-yellow-500/20">Pro Feature</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex items-center justify-center h-full">
                  <BarChart3 className="h-32 w-32 text-gray-500 opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Portfolio Health Tab */}
        <TabsContent value="portfolio" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Overall Risk Score</CardTitle>
                <CardDescription className="text-gray-400">Aggregate risk across all APIs</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ApiRiskRadar />
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 col-span-3 md:col-span-2 relative">
              {isProFeature && <PaywallOverlay feature="API dependency mapping" onUpgrade={onUpgrade} />}
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">API Dependency Map</CardTitle>
                    <CardDescription className="text-gray-400">Visual graph of API interconnections</CardDescription>
                  </div>
                  {isProFeature && (
                    <Badge className="bg-yellow-900/20 text-yellow-400 border-yellow-500/20">Pro Feature</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ApiDependencyGraph />
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 col-span-3 md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">API Category Distribution</CardTitle>
                <CardDescription className="text-gray-400">Breakdown of your API portfolio by category</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ApiCategoryDistribution />
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 relative">
              {isEnterpriseFeature && <PaywallOverlay feature="Risk concentration analysis" onUpgrade={onUpgrade} />}
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">Risk Concentration</CardTitle>
                    <CardDescription className="text-gray-400">Vendor dependency warnings</CardDescription>
                  </div>
                  {isEnterpriseFeature && (
                    <Badge className="bg-purple-900/20 text-purple-400 border-purple-500/20">Enterprise Feature</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[300px]">
                  <PieChart className="h-32 w-32 text-gray-500 opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Predictions Tab */}
        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700 col-span-3 relative">
              {isProFeature && <PaywallOverlay feature="12-month stability predictions" onUpgrade={onUpgrade} />}
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">API Stability Forecast</CardTitle>
                    <CardDescription className="text-gray-400">Predicted stability over next 12 months</CardDescription>
                  </div>
                  {isProFeature && (
                    <Badge className="bg-yellow-900/20 text-yellow-400 border-yellow-500/20">Pro Feature</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ApiPredictiveChart />
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 col-span-3 md:col-span-2 relative">
              {isEnterpriseFeature && <PaywallOverlay feature="Early warning system" onUpgrade={onUpgrade} />}
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">Early Warning Indicators</CardTitle>
                    <CardDescription className="text-gray-400">
                      Signals that predict upcoming API changes
                    </CardDescription>
                  </div>
                  {isEnterpriseFeature && (
                    <Badge className="bg-purple-900/20 text-purple-400 border-purple-500/20">Enterprise Feature</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center h-[300px]">
                    <Zap className="h-32 w-32 text-gray-500 opacity-50" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 relative">
              {isProFeature && <PaywallOverlay feature="Prediction accuracy metrics" onUpgrade={onUpgrade} />}
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">Prediction Accuracy</CardTitle>
                    <CardDescription className="text-gray-400">Historical accuracy of our predictions</CardDescription>
                  </div>
                  {isProFeature && (
                    <Badge className="bg-yellow-900/20 text-yellow-400 border-yellow-500/20">Pro Feature</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[300px]">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-400">87%</div>
                    <div className="text-gray-400 mt-2">Prediction Accuracy</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Reporting Section */}
      <Card className="bg-gray-800 border-gray-700 relative">
        {isProFeature && <PaywallOverlay feature="Automated reporting" onUpgrade={onUpgrade} />}
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-lg">Automated Reports</CardTitle>
              <CardDescription className="text-gray-400">Schedule and customize recurring reports</CardDescription>
            </div>
            {isProFeature && (
              <Badge className="bg-yellow-900/20 text-yellow-400 border-yellow-500/20">Pro Feature</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-white">Report Type</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="weekly" disabled={isProFeature} />
                    <Label htmlFor="weekly" className="text-gray-300">
                      Weekly Summary
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="monthly" disabled={isProFeature} />
                    <Label htmlFor="monthly" className="text-gray-300">
                      Monthly Analysis
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="custom" disabled={isProFeature} />
                    <Label htmlFor="custom" className="text-gray-300">
                      Custom Date Range
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-white">Delivery Method</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="email" disabled={isProFeature} />
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="slack" disabled={isProFeature} />
                    <Label htmlFor="slack" className="text-gray-300">
                      Slack
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="dashboard" disabled={isProFeature} />
                    <Label htmlFor="dashboard" className="text-gray-300">
                      Dashboard Only
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-white">Format</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="pdf" disabled={isProFeature} />
                    <Label htmlFor="pdf" className="text-gray-300">
                      PDF Report
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="csv" disabled={isProFeature} />
                    <Label htmlFor="csv" className="text-gray-300">
                      CSV Data Export
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="interactive" disabled={isProFeature} />
                    <Label htmlFor="interactive" className="text-gray-300">
                      Interactive Dashboard
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button disabled={isProFeature} className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Reports
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

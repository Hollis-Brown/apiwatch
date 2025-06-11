"use client"

import * as React from "react"
import {
  Search,
  Plus,
  Bell,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  Zap,
  RefreshCw,
  BarChart3,
  Settings,
  Brain,
  Target,
  Mail,
  Smartphone,
  Info,
  Github,
  CreditCard,
  LogOut,
  Users,
  ArrowRight,
  Menu,
  Home,
  MoreVertical,
  Download,
  Upload,
  Shield,
  Building,
  FileText,
  DollarSign,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  Mic,
  Camera,
  Fingerprint,
  WifiOff,
  Sun,
  Moon,
  ArrowUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent } from "@/components/ui/sheet"

import { AnalyticsDashboard } from "../components/analytics/analytics-dashboard"
import { IntegrationsPage } from "../components/integrations/integrations-page"

// PWA and Mobile Hooks
function useSwipeGesture(onSwipeLeft?: () => void, onSwipeRight?: () => void) {
  const [touchStart, setTouchStart] = React.useState<number | null>(null)
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && onSwipeLeft) onSwipeLeft()
    if (isRightSwipe && onSwipeRight) onSwipeRight()
  }

  return { onTouchStart, onTouchMove, onTouchEnd }
}

function usePWA() {
  const [isOnline, setIsOnline] = React.useState(true)
  const [installPrompt, setInstallPrompt] = React.useState<any>(null)
  const [isInstalled, setIsInstalled] = React.useState(false)

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // PWA install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault()
      setInstallPrompt(e)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const installPWA = async () => {
    if (installPrompt) {
      installPrompt.prompt()
      const result = await installPrompt.userChoice
      if (result.outcome === "accepted") {
        setInstallPrompt(null)
        setIsInstalled(true)
      }
    }
  }

  return { isOnline, installPWA, canInstall: !!installPrompt, isInstalled }
}

function useHapticFeedback() {
  const vibrate = (pattern: number | number[] = 10) => {
    if ("vibrate" in navigator) {
      navigator.vibrate(pattern)
    }
  }

  return { vibrate }
}

function usePullToRefresh(onRefresh: () => Promise<void>) {
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [pullDistance, setPullDistance] = React.useState(0)
  const [startY, setStartY] = React.useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY
    const distance = currentY - startY

    if (distance > 0 && window.scrollY === 0) {
      setPullDistance(Math.min(distance, 100))
    }
  }

  const handleTouchEnd = async () => {
    if (pullDistance > 60) {
      setIsRefreshing(true)
      await onRefresh()
      setIsRefreshing(false)
    }
    setPullDistance(0)
  }

  return {
    isRefreshing,
    pullDistance,
    pullToRefreshProps: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  }
}

// Types
type Plan = "free" | "pro" | "enterprise"
type Role = "admin" | "member" | "viewer"

type User = {
  id: string
  email: string
  name: string
  avatar?: string
  plan: Plan
  role?: Role
  apisUsed: number
  apisLimit: number
  joinedDate: string
  lastActive?: string
  department?: string
  isOwner?: boolean
}

type TeamMember = {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
  joinedDate: string
  lastActive: string
  department: string
  status: "active" | "pending" | "inactive"
}

type AuditLog = {
  id: string
  userId: string
  userName: string
  action: string
  target: string
  timestamp: string
  details: string
  ipAddress: string
}

type ComplianceReport = {
  id: string
  type: "SOC2" | "GDPR" | "HIPAA" | "PCI"
  status: "compliant" | "non-compliant" | "pending"
  lastAudit: string
  nextAudit: string
  findings: number
}

const plans = {
  free: {
    name: "Free",
    price: 0,
    apisLimit: 5,
    checkFrequency: "Daily",
    features: ["5 APIs", "Daily checks", "Email alerts", "Basic dashboard"],
    color: "text-gray-400",
  },
  pro: {
    name: "Pro",
    price: 19,
    apisLimit: 50,
    checkFrequency: "Hourly",
    features: ["50 APIs", "Hourly checks", "Slack integration", "Advanced analytics", "Priority support"],
    color: "text-blue-400",
    popular: true,
  },
  enterprise: {
    name: "Enterprise",
    price: 99,
    apisLimit: -1,
    checkFrequency: "Real-time",
    features: ["Unlimited APIs", "Real-time monitoring", "Team collaboration", "Custom integrations", "SLA guarantee"],
    color: "text-purple-400",
  },
}

const apis = [
  {
    id: 1,
    name: "Stripe Payment API",
    version: "v2023-10-16",
    status: "Stable",
    statusColor: "bg-green-500",
    lastChecked: "2 hours ago",
    isMonitoring: true,
    baseUrl: "https://api.stripe.com",
    docUrl: "https://stripe.com/docs/api",
    checkFrequency: "1hr",
    healthScore: 92,
    riskLevel: "low",
    lastMajorUpdate: "3 months ago",
    communityActivity: "high",
    officialStatements: "positive",
    riskTimeline: "Low risk next 12 months",
    confidenceScore: 94,
    isPro: false,
    isApproved: true,
    owner: "Finance Team",
    costCenter: "CC-001",
  },
  {
    id: 2,
    name: "Twilio SMS API",
    version: "v2010-04-01",
    status: "Warning",
    statusColor: "bg-yellow-500",
    lastChecked: "1 hour ago",
    isMonitoring: true,
    baseUrl: "https://api.twilio.com",
    docUrl: "https://www.twilio.com/docs/sms",
    checkFrequency: "15min",
    healthScore: 78,
    riskLevel: "medium",
    lastMajorUpdate: "8 months ago",
    communityActivity: "medium",
    officialStatements: "neutral",
    riskTimeline: "Medium risk 6-12 months",
    confidenceScore: 87,
    isPro: false,
    isApproved: true,
    owner: "Marketing Team",
    costCenter: "CC-002",
  },
  {
    id: 3,
    name: "GitHub REST API",
    version: "v3",
    status: "Deprecated Soon",
    statusColor: "bg-red-500",
    lastChecked: "30 minutes ago",
    isMonitoring: true,
    baseUrl: "https://api.github.com",
    docUrl: "https://docs.github.com/en/rest",
    checkFrequency: "1hr",
    healthScore: 34,
    riskLevel: "high",
    lastMajorUpdate: "18 months ago",
    communityActivity: "low",
    officialStatements: "deprecation announced",
    riskTimeline: "High risk - Deprecated Q1 2024",
    confidenceScore: 96,
    isPro: false,
    isApproved: false,
    owner: "Engineering Team",
    costCenter: "CC-003",
  },
]

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@company.com",
    role: "admin",
    avatar: "/placeholder.svg",
    joinedDate: "2024-01-15",
    lastActive: "2 hours ago",
    department: "Engineering",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: "member",
    avatar: "/placeholder.svg",
    joinedDate: "2024-01-20",
    lastActive: "1 day ago",
    department: "Product",
    status: "active",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@company.com",
    role: "viewer",
    avatar: "/placeholder.svg",
    joinedDate: "2024-02-01",
    lastActive: "3 days ago",
    department: "Finance",
    status: "pending",
  },
]

const auditLogs: AuditLog[] = [
  {
    id: "1",
    userId: "1",
    userName: "John Smith",
    action: "Added API",
    target: "Stripe Payment API",
    timestamp: "2024-01-17 14:30:25",
    details: "Added new API for payment processing",
    ipAddress: "192.168.1.100",
  },
  {
    id: "2",
    userId: "2",
    userName: "Sarah Johnson",
    action: "Updated Settings",
    target: "Notification Preferences",
    timestamp: "2024-01-17 13:15:10",
    details: "Enabled Slack notifications",
    ipAddress: "192.168.1.101",
  },
  {
    id: "3",
    userId: "1",
    userName: "John Smith",
    action: "Invited User",
    target: "mike@company.com",
    timestamp: "2024-01-17 12:45:33",
    details: "Invited new team member with viewer role",
    ipAddress: "192.168.1.100",
  },
]

const complianceReports: ComplianceReport[] = [
  {
    id: "1",
    type: "SOC2",
    status: "compliant",
    lastAudit: "2024-01-01",
    nextAudit: "2024-07-01",
    findings: 0,
  },
  {
    id: "2",
    type: "GDPR",
    status: "compliant",
    lastAudit: "2024-01-15",
    nextAudit: "2024-04-15",
    findings: 2,
  },
  {
    id: "3",
    type: "HIPAA",
    status: "pending",
    lastAudit: "2023-12-01",
    nextAudit: "2024-03-01",
    findings: 1,
  },
]

// Mobile Bottom Navigation Component
function MobileBottomNav({ activePage, setActivePage }: { activePage: string; setActivePage: (page: string) => void }) {
  const { vibrate } = useHapticFeedback()

  const navItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "integrations", label: "Integrations", icon: Zap },
    { id: "admin", label: "Admin", icon: Users },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 md:hidden z-50">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              vibrate(10)
              setActivePage(item.id)
            }}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
              activePage === item.id ? "text-blue-400" : "text-gray-400"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// PWA Install Banner
function PWAInstallBanner() {
  const { canInstall, installPWA, isInstalled } = usePWA()
  const [dismissed, setDismissed] = React.useState(false)

  if (!canInstall || isInstalled || dismissed) return null

  return (
    <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Smartphone className="h-5 w-5" />
        <div>
          <div className="font-medium">Install APIWatch</div>
          <div className="text-sm opacity-90">Get the full app experience</div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="ghost" onClick={() => setDismissed(true)} className="text-white hover:bg-blue-700">
          Later
        </Button>
        <Button size="sm" onClick={installPWA} className="bg-white text-blue-600 hover:bg-gray-100">
          Install
        </Button>
      </div>
    </div>
  )
}

// Offline Banner
function OfflineBanner() {
  const { isOnline } = usePWA()

  if (isOnline) return null

  return (
    <div className="bg-orange-600 text-white p-2 text-center text-sm flex items-center justify-center gap-2">
      <WifiOff className="h-4 w-4" />
      You're offline. Some features may be limited.
    </div>
  )
}

// Loading Skeleton Component
function LoadingSkeleton() {
  return (
    <div className="space-y-4 p-6">
      <div className="h-8 bg-gray-700 rounded animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-700 rounded animate-pulse" />
        ))}
      </div>
      <div className="h-64 bg-gray-700 rounded animate-pulse" />
    </div>
  )
}

// Mobile API Card with Swipe Actions
function MobileAPICard({ api, onEdit, onDelete }: { api: any; onEdit: () => void; onDelete: () => void }) {
  const [showActions, setShowActions] = React.useState(false)
  const { vibrate } = useHapticFeedback()

  const swipeHandlers = useSwipeGesture(
    () => {
      setShowActions(true)
      vibrate(10)
    },
    () => setShowActions(false),
  )

  return (
    <div className="relative overflow-hidden bg-gray-800 rounded-lg border border-gray-700">
      <div
        className={`transition-transform duration-200 ${showActions ? "-translate-x-32" : "translate-x-0"}`}
        {...swipeHandlers}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${api.statusColor}`} />
              <span className="font-medium text-white text-sm">{api.name}</span>
            </div>
            <Badge className="text-xs">{api.status}</Badge>
          </div>
          <div className="text-xs text-gray-400 mb-2">{api.version}</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Brain className="h-3 w-3 text-blue-400" />
              <span className="text-blue-400 text-xs">{api.healthScore}/100</span>
            </div>
            <span className="text-gray-500 text-xs">{api.lastChecked}</span>
          </div>
        </div>
      </div>

      {/* Swipe Actions */}
      <div className="absolute right-0 top-0 h-full w-32 bg-red-600 flex items-center justify-center">
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={onEdit} className="text-white p-2">
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={onDelete} className="text-white p-2">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// Voice Search Component
function VoiceSearch({ onResult }: { onResult: (text: string) => void }) {
  const [isListening, setIsListening] = React.useState(false)
  const { vibrate } = useHapticFeedback()

  const startListening = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onstart = () => {
        setIsListening(true)
        vibrate([10, 50, 10])
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        onResult(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={startListening}
      disabled={isListening}
      className={`${isListening ? "text-red-400 animate-pulse" : "text-gray-400"} hover:text-white`}
    >
      <Mic className="h-4 w-4" />
    </Button>
  )
}

// QR Code Scanner Component
function QRScanner({ onScan }: { onScan: (data: string) => void }) {
  const [isScanning, setIsScanning] = React.useState(false)

  const startScanning = () => {
    // Simulate QR code scanning
    setIsScanning(true)
    setTimeout(() => {
      onScan("https://api.example.com")
      setIsScanning(false)
    }, 2000)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={startScanning}
      disabled={isScanning}
      className="text-gray-400 hover:text-white"
    >
      <Camera className="h-4 w-4" />
    </Button>
  )
}

// Biometric Auth Component
function BiometricAuth({ onSuccess }: { onSuccess: () => void }) {
  const [isAuthenticating, setIsAuthenticating] = React.useState(false)
  const { vibrate } = useHapticFeedback()

  const authenticate = async () => {
    setIsAuthenticating(true)
    vibrate([10, 100, 10])

    // Simulate biometric authentication
    setTimeout(() => {
      setIsAuthenticating(false)
      onSuccess()
    }, 1500)
  }

  return (
    <Button
      onClick={authenticate}
      disabled={isAuthenticating}
      className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
    >
      <Fingerprint className={`h-4 w-4 ${isAuthenticating ? "animate-pulse" : ""}`} />
      {isAuthenticating ? "Authenticating..." : "Use Biometric"}
    </Button>
  )
}

// Team Management Component
function TeamManagement({ user }: { user: User }) {
  const [members, setMembers] = React.useState(teamMembers)
  const [showInviteModal, setShowInviteModal] = React.useState(false)
  const [inviteEmail, setInviteEmail] = React.useState("")
  const [inviteRole, setInviteRole] = React.useState<Role>("member")
  const { toast } = useToast()

  const handleInvite = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: inviteEmail.split("@")[0],
      email: inviteEmail,
      role: inviteRole,
      joinedDate: new Date().toISOString().split("T")[0],
      lastActive: "Never",
      department: "Pending",
      status: "pending",
    }

    setMembers([...members, newMember])
    setInviteEmail("")
    setInviteRole("member")
    setShowInviteModal(false)

    toast({
      title: "Invitation sent",
      description: `Invited ${inviteEmail} as ${inviteRole}`,
    })
  }

  const getRoleColor = (role: Role) => {
    switch (role) {
      case "admin":
        return "bg-red-900/20 text-red-400 border-red-500/20"
      case "member":
        return "bg-blue-900/20 text-blue-400 border-blue-500/20"
      case "viewer":
        return "bg-gray-900/20 text-gray-400 border-gray-500/20"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-900/20 text-green-400 border-green-500/20"
      case "pending":
        return "bg-yellow-900/20 text-yellow-400 border-yellow-500/20"
      case "inactive":
        return "bg-gray-900/20 text-gray-400 border-gray-500/20"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Team Management</h2>
          <p className="text-gray-400">Manage team members and their permissions</p>
        </div>
        <Button onClick={() => setShowInviteModal(true)} className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Members</p>
                <p className="text-2xl font-bold text-white">{members.length}</p>
              </div>
              <Users className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active</p>
                <p className="text-2xl font-bold text-green-400">
                  {members.filter((m) => m.status === "active").length}
                </p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {members.filter((m) => m.status === "pending").length}
                </p>
              </div>
              <Clock className="h-6 w-6 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Departments</p>
                <p className="text-2xl font-bold text-purple-400">4</p>
              </div>
              <Building className="h-6 w-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Members Table */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Member</TableHead>
                  <TableHead className="text-gray-300">Role</TableHead>
                  <TableHead className="text-gray-300">Department</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Last Active</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id} className="border-gray-700">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gray-700 text-white text-xs">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{member.name}</div>
                          <div className="text-sm text-gray-400">{member.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(member.role)}>{member.role}</Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">{member.department}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">{member.lastActive}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-800 border-gray-700">
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                            <Eye className="h-4 w-4 mr-2" />
                            View Activity
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-700" />
                          <DropdownMenuItem className="text-red-400 hover:bg-red-900/20">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Invite Modal */}
      <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription className="text-gray-400">
              Send an invitation to join your APIWatch team
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-white">Email Address</Label>
              <Input
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="colleague@company.com"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Role</Label>
              <Select value={inviteRole} onValueChange={(value: Role) => setInviteRole(value)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="viewer">Viewer - Read-only access</SelectItem>
                  <SelectItem value="member">Member - Can add/edit APIs</SelectItem>
                  <SelectItem value="admin">Admin - Full access</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleInvite} className="flex-1 bg-blue-600 hover:bg-blue-700">
                Send Invitation
              </Button>
              <Button variant="outline" onClick={() => setShowInviteModal(false)} className="border-gray-600">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Audit Log Component
function AuditLog() {
  const [logs] = React.useState(auditLogs)
  const [filter, setFilter] = React.useState("all")

  const filteredLogs = filter === "all" ? logs : logs.filter((log) => log.action.toLowerCase().includes(filter))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Audit Log</h2>
          <p className="text-gray-400">Track all team activities and changes</p>
        </div>
        <div className="flex gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="all">All Activities</SelectItem>
              <SelectItem value="added">API Added</SelectItem>
              <SelectItem value="updated">Settings Updated</SelectItem>
              <SelectItem value="invited">User Invited</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-gray-600 text-gray-300">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">User</TableHead>
                  <TableHead className="text-gray-300">Action</TableHead>
                  <TableHead className="text-gray-300">Target</TableHead>
                  <TableHead className="text-gray-300">Timestamp</TableHead>
                  <TableHead className="text-gray-300">IP Address</TableHead>
                  <TableHead className="text-gray-300">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id} className="border-gray-700">
                    <TableCell className="text-white font-medium">{log.userName}</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-900/20 text-blue-400 border-blue-500/20">{log.action}</Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">{log.target}</TableCell>
                    <TableCell className="text-gray-300 font-mono text-sm">{log.timestamp}</TableCell>
                    <TableCell className="text-gray-300 font-mono text-sm">{log.ipAddress}</TableCell>
                    <TableCell className="text-gray-300">{log.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Compliance Dashboard Component
function ComplianceDashboard() {
  const [reports] = React.useState(complianceReports)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "bg-green-900/20 text-green-400 border-green-500/20"
      case "non-compliant":
        return "bg-red-900/20 text-red-400 border-red-500/20"
      case "pending":
        return "bg-yellow-900/20 text-yellow-400 border-yellow-500/20"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Compliance Dashboard</h2>
          <p className="text-gray-400">Monitor compliance status across all frameworks</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reports.map((report) => (
          <Card key={report.id} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white">{report.type}</h3>
                <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Audit:</span>
                  <span className="text-white">{report.lastAudit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Next Audit:</span>
                  <span className="text-white">{report.nextAudit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Findings:</span>
                  <span className={report.findings > 0 ? "text-yellow-400" : "text-green-400"}>{report.findings}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Compliance Actions */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Required Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-900/20 border border-yellow-500/20 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <div>
                  <div className="font-medium text-white">HIPAA Audit Due</div>
                  <div className="text-sm text-gray-400">Schedule audit before March 1, 2024</div>
                </div>
              </div>
              <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                Schedule
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-blue-400" />
                <div>
                  <div className="font-medium text-white">GDPR Data Mapping</div>
                  <div className="text-sm text-gray-400">Update data processing records</div>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-blue-500 text-blue-400">
                Review
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Custom Branding Component
function CustomBranding() {
  const [branding, setBranding] = React.useState({
    logo: null,
    primaryColor: "#3b82f6",
    secondaryColor: "#1f2937",
    companyName: "Your Company",
    customDomain: "",
    whiteLabel: false,
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Custom Branding</h2>
        <p className="text-gray-400">Customize APIWatch to match your company's brand</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Brand Assets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-white">Company Logo</Label>
              <div className="mt-2 border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Upload your logo (PNG, SVG)</p>
                <Button size="sm" className="mt-2">
                  Choose File
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-white">Company Name</Label>
              <Input
                value={branding.companyName}
                onChange={(e) => setBranding({ ...branding, companyName: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Color Scheme</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-white">Primary Color</Label>
              <div className="flex gap-2 mt-2">
                <input
                  type="color"
                  value={branding.primaryColor}
                  onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                  className="w-12 h-10 rounded border border-gray-600"
                />
                <Input
                  value={branding.primaryColor}
                  onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-white">Secondary Color</Label>
              <div className="flex gap-2 mt-2">
                <input
                  type="color"
                  value={branding.secondaryColor}
                  onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                  className="w-12 h-10 rounded border border-gray-600"
                />
                <Input
                  value={branding.secondaryColor}
                  onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Domain Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-white">Custom Domain</Label>
              <Input
                value={branding.customDomain}
                onChange={(e) => setBranding({ ...branding, customDomain: e.target.value })}
                placeholder="apiwatch.yourcompany.com"
                className="bg-gray-700 border-gray-600 text-white"
              />
              <p className="text-xs text-gray-400 mt-1">Enterprise feature</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">White Label Mode</Label>
                <p className="text-xs text-gray-400">Remove APIWatch branding</p>
              </div>
              <Switch
                checked={branding.whiteLabel}
                onCheckedChange={(checked) => setBranding({ ...branding, whiteLabel: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <span className="text-white font-bold">{branding.companyName} API Monitor</span>
              </div>
              <div className="space-y-2">
                <div className="h-2 rounded" style={{ backgroundColor: branding.primaryColor, opacity: 0.3 }} />
                <div className="h-2 rounded w-3/4" style={{ backgroundColor: branding.secondaryColor }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700">Save Branding Settings</Button>
      </div>
    </div>
  )
}

// Admin Dashboard Component
function AdminDashboard({ user }: { user: User }) {
  const [activeTab, setActiveTab] = React.useState("team")

  if (user.role !== "admin" && !user.isOwner) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Access Denied</h3>
          <p className="text-gray-400">You need admin privileges to access this section.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400">Manage your organization's APIWatch deployment</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 bg-gray-700">
          <TabsTrigger value="team" className="data-[state=active]:bg-gray-600">
            Team
          </TabsTrigger>
          <TabsTrigger value="audit" className="data-[state=active]:bg-gray-600">
            Audit
          </TabsTrigger>
          <TabsTrigger value="compliance" className="data-[state=active]:bg-gray-600">
            Compliance
          </TabsTrigger>
          <TabsTrigger value="branding" className="data-[state=active]:bg-gray-600">
            Branding
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-gray-600">
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="team">
          <TeamManagement user={user} />
        </TabsContent>

        <TabsContent value="audit">
          <AuditLog />
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceDashboard />
        </TabsContent>

        <TabsContent value="branding">
          <CustomBranding />
        </TabsContent>

        <TabsContent value="billing">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Billing Management</h2>
              <p className="text-gray-400">Manage billing, usage, and spending controls</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Monthly Spend</p>
                      <p className="text-3xl font-bold text-white">$2,847</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-400" />
                  </div>
                  <p className="text-green-400 text-sm mt-2">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">API Calls</p>
                      <p className="text-3xl font-bold text-white">1.2M</p>
                    </div>
                    <Activity className="h-8 w-8 text-blue-400" />
                  </div>
                  <p className="text-blue-400 text-sm mt-2">Within budget</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Budget Remaining</p>
                      <p className="text-3xl font-bold text-white">$1,153</p>
                    </div>
                    <Target className="h-8 w-8 text-purple-400" />
                  </div>
                  <p className="text-purple-400 text-sm mt-2">40% remaining</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Enhanced Mobile Search with Voice and QR
function EnhancedMobileSearch() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isVoiceActive, setIsVoiceActive] = React.useState(false)
  const { toast } = useToast()

  const handleVoiceResult = (text: string) => {
    setSearchQuery(text)
    setIsVoiceActive(false)
    toast({
      title: "Voice search",
      description: `Searching for: ${text}`,
    })
  }

  const handleQRScan = (data: string) => {
    setSearchQuery(data)
    toast({
      title: "QR Code scanned",
      description: `Added: ${data}`,
    })
  }

  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search APIs, alerts, or changes..."
        className="pl-10 pr-20 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
        <VoiceSearch onResult={handleVoiceResult} />
        <QRScanner onScan={handleQRScan} />
      </div>
    </div>
  )
}

// Main Dashboard Component with all enhancements
export default function APIWatchDashboard() {
  const [user, setUser] = React.useState<User | null>(null)
  const [showAuthModal, setShowAuthModal] = React.useState(false)
  const [showBillingModal, setShowBillingModal] = React.useState(false)
  const [showOnboardingModal, setShowOnboardingModal] = React.useState(false)
  const [selectedAPI, setSelectedAPI] = React.useState<any>(null)
  const [showDetailModal, setShowDetailModal] = React.useState(false)
  const [showSettingsModal, setShowSettingsModal] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(new Date())
  const [activePage, setActivePage] = React.useState("dashboard")
  const [isLoading, setIsLoading] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [darkMode, setDarkMode] = React.useState(true)

  const { isOnline } = usePWA()
  const { vibrate } = useHapticFeedback()

  // Pull to refresh
  const { isRefreshing, pullDistance, pullToRefreshProps } = usePullToRefresh(async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  })

  // Detect mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Auto-refresh simulation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // System theme detection
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setDarkMode(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  const handleLogin = (newUser: User) => {
    setUser({ ...newUser, role: "admin", isOwner: true })
    setTimeout(() => setShowOnboardingModal(true), 500)
  }

  const handleLogout = () => {
    setUser(null)
    setShowAuthModal(false)
    setActivePage("dashboard")
  }

  const handleAPIClick = (api: any) => {
    if (!user) {
      setShowAuthModal(true)
      return
    }

    vibrate(10)
    if (api.isPro && user.plan === "free") {
      setShowBillingModal(true)
      return
    }

    setSelectedAPI(api)
    setShowDetailModal(true)
  }

  const handleUpgrade = () => {
    setShowBillingModal(true)
  }

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <LoadingSkeleton />
      </div>
    )
  }

  // Landing page for non-authenticated users
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <PWAInstallBanner />
        <OfflineBanner />

        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="text-center space-y-6 max-w-md w-full">
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                <Activity className="h-7 w-7 text-white" />
              </div>
              <span className="text-3xl font-bold text-white">APIWatch</span>
            </div>

            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Monitor API Changes & Deprecations</h1>
              <p className="text-gray-400 text-lg mb-6">
                Stay ahead of breaking changes with AI-powered API monitoring and intelligent alerts.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-left">
              <h3 className="font-semibold text-white mb-3">Join 2,847 developers who trust APIWatch</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Real-time API health monitoring
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  AI-powered deprecation predictions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Smart migration recommendations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Team collaboration tools
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => setShowAuthModal(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg touch-manipulation"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>

              <BiometricAuth onSuccess={() => setShowAuthModal(true)} />
            </div>

            <p className="text-xs text-gray-500">Free plan includes 5 APIs • No credit card required</p>
          </div>
        </div>

        {/* Auth Modal with mobile optimizations */}
        <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
          <DialogContent className="max-w-md bg-gray-800 border-gray-700 text-white mx-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white text-center">Welcome to APIWatch</DialogTitle>
              <DialogDescription className="text-gray-400 text-center">
                Sign in to start monitoring your APIs
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <Button
                onClick={() => {
                  const mockUser: User = {
                    id: "1",
                    email: "demo@company.com",
                    name: "Demo User",
                    plan: "enterprise",
                    role: "admin",
                    apisUsed: 3,
                    apisLimit: -1,
                    joinedDate: new Date().toISOString(),
                    isOwner: true,
                  }
                  handleLogin(mockUser)
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 touch-manipulation"
              >
                <Github className="h-4 w-4 mr-2" />
                Continue with GitHub
              </Button>

              <Button
                onClick={() => {
                  const mockUser: User = {
                    id: "1",
                    email: "demo@company.com",
                    name: "Demo User",
                    plan: "enterprise",
                    role: "admin",
                    apisUsed: 3,
                    apisLimit: -1,
                    joinedDate: new Date().toISOString(),
                    isOwner: true,
                  }
                  handleLogin(mockUser)
                }}
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 py-3 touch-manipulation"
              >
                <Mail className="h-4 w-4 mr-2" />
                Continue with Email
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  const activeMonitoringCount = apis.filter((api) => api.isMonitoring && (!api.isPro || user.plan !== "free")).length
  const alertCount = user.plan === "free" ? Math.min(3, 2) : 3
  const criticalAlerts = 1
  const stableCount = apis.filter((api) => api.status === "Stable").length

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-white"} text-white`}>
      <PWAInstallBanner />
      <OfflineBanner />

      {/* Pull to refresh indicator */}
      {pullDistance > 0 && (
        <div
          className="fixed top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 z-50 transition-transform"
          style={{ transform: `translateY(${Math.min(pullDistance - 60, 0)}px)` }}
        >
          {pullDistance > 60 ? (
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Release to refresh
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <ArrowUp className="h-4 w-4" />
              Pull to refresh
            </div>
          )}
        </div>
      )}

      <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
        {/* Mobile Sidebar */}
        {isMobile ? (
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent side="left" className="w-80 bg-gray-800 border-gray-700 p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white">APIWatch</span>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-2">My APIs</h3>
                      <div className="space-y-2">
                        {apis.slice(0, user.plan === "free" ? 3 : apis.length).map((api) => (
                          <MobileAPICard
                            key={api.id}
                            api={api}
                            onEdit={() => {
                              setSidebarOpen(false)
                              handleAPIClick(api)
                            }}
                            onDelete={() => {
                              vibrate([10, 50, 10])
                              // Handle delete
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                <div className="p-4 border-t border-gray-700">
                  <Button
                    onClick={() => setSidebarOpen(false)}
                    className="w-full bg-blue-600 hover:bg-blue-700 touch-manipulation"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add API
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <Sidebar className="border-r border-gray-700 bg-gray-800">
            <SidebarHeader className="border-b border-gray-700 p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">APIWatch</span>
              </div>
            </SidebarHeader>

            <SidebarContent className="bg-gray-800">
              <SidebarGroup>
                <SidebarGroupLabel className="text-gray-300 text-sm font-medium px-4 py-2">My APIs</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {apis.slice(0, user.plan === "free" ? 3 : apis.length).map((api) => (
                      <SidebarMenuItem key={api.id}>
                        <SidebarMenuButton
                          onClick={() => handleAPIClick(api)}
                          className="w-full p-3 text-left hover:bg-gray-700 transition-colors cursor-pointer"
                        >
                          <div className="flex items-start gap-3 w-full">
                            <div className={`w-2 h-2 rounded-full ${api.statusColor} mt-2`} />
                            <div className="flex-1 min-w-0">
                              <div className="text-white font-medium text-sm truncate">{api.name}</div>
                              <div className="text-gray-400 text-xs">{api.version}</div>
                              <div className="flex items-center gap-1 mt-1">
                                <Brain className="h-3 w-3 text-blue-400" />
                                <span className="text-blue-400 text-xs">{api.healthScore}/100</span>
                              </div>
                            </div>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
              <div className="p-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-3">
                  <Plus className="h-4 w-4 mr-2" />
                  Add API
                </Button>
              </div>
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>
        )}

        <SidebarInset>
          {/* Header */}
          <header className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="flex h-16 items-center gap-4 px-4 md:px-6" {...pullToRefreshProps}>
              {isMobile ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className="text-gray-400 hover:text-white touch-manipulation"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              ) : (
                <SidebarTrigger className="text-gray-400 hover:text-white" />
              )}

              <div className="flex-1 flex items-center gap-4">
                <EnhancedMobileSearch />
              </div>

              <div className="flex items-center gap-2">
                {/* Online/Offline indicator */}
                <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-400" : "bg-red-400"}`} />

                {/* Dark mode toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-gray-400 hover:text-white touch-manipulation"
                >
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>

                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white relative touch-manipulation"
                >
                  <Bell className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
                    3
                  </div>
                </Button>

                {/* User menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 rounded-full p-0 touch-manipulation">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-gray-700 text-white text-xs">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 bg-gray-800 border-gray-700 text-white" align="end">
                    <DropdownMenuLabel>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-gray-700 text-white">
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:bg-red-900/20">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className={`flex-1 p-4 md:p-6 space-y-6 ${isMobile ? "pb-20" : ""}`}>
            {activePage === "dashboard" && (
              <>
                {/* Status Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="bg-gray-800 border-gray-700 touch-manipulation">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-xs md:text-sm">APIs</p>
                          <p className="text-xl md:text-3xl font-bold text-white">{user.apisUsed}</p>
                        </div>
                        <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700 touch-manipulation">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-xs md:text-sm">Alerts</p>
                          <p className="text-xl md:text-3xl font-bold text-white">{alertCount}</p>
                        </div>
                        <Bell className="h-6 w-6 md:h-8 md:w-8 text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700 touch-manipulation">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-xs md:text-sm">Critical</p>
                          <p className="text-xl md:text-3xl font-bold text-red-400">{criticalAlerts}</p>
                        </div>
                        <XCircle className="h-6 w-6 md:h-8 md:w-8 text-red-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700 touch-manipulation">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-xs md:text-sm">Stable</p>
                          <p className="text-xl md:text-3xl font-bold text-green-400">{stableCount}</p>
                        </div>
                        <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Mobile API List */}
                {isMobile && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white">Your APIs</h2>
                    <div className="space-y-3">
                      {apis.slice(0, user.plan === "free" ? 3 : apis.length).map((api) => (
                        <MobileAPICard
                          key={api.id}
                          api={api}
                          onEdit={() => handleAPIClick(api)}
                          onDelete={() => vibrate([10, 50, 10])}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Desktop Timeline */}
                {!isMobile && (
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Recent Changes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            api: "GitHub REST API",
                            change: "Deprecation Notice",
                            time: "2 hours ago",
                            severity: "high",
                          },
                          {
                            api: "Twilio SMS API",
                            change: "Rate Limit Update",
                            time: "4 hours ago",
                            severity: "medium",
                          },
                          { api: "Stripe API", change: "New Feature", time: "1 day ago", severity: "low" },
                        ].map((event, index) => (
                          <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700/50">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                event.severity === "high"
                                  ? "bg-red-500"
                                  : event.severity === "medium"
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                              }`}
                            />
                            <div className="flex-1">
                              <div className="font-medium text-white">{event.api}</div>
                              <div className="text-sm text-gray-400">{event.change}</div>
                            </div>
                            <div className="text-xs text-gray-500">{event.time}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {activePage === "analytics" && <AnalyticsDashboard user={user} onUpgrade={handleUpgrade} />}
            {activePage === "integrations" && <IntegrationsPage user={user} onUpgrade={handleUpgrade} />}
            {activePage === "admin" && <AdminDashboard user={user} />}
          </main>
        </SidebarInset>

        {/* Mobile Bottom Navigation */}
        {isMobile && <MobileBottomNav activePage={activePage} setActivePage={setActivePage} />}
      </SidebarProvider>

      <Toaster />
    </div>
  )
}

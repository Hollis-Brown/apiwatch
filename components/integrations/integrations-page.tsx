"use client"

import * as React from "react"
import {
  Plus,
  Check,
  AlertCircle,
  ExternalLink,
  Copy,
  Zap,
  Users,
  Key,
  Clock,
  Activity,
  Bell,
  MessageSquare,
  Mail,
  Webhook,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

import { SlackIntegrationModal } from "./slack-integration-modal"
import { DiscordIntegrationModal } from "./discord-integration-modal"
import { TeamsIntegrationModal } from "./teams-integration-modal"
import { WebhookIntegrationModal } from "./webhook-integration-modal"
import { EmailIntegrationModal } from "./email-integration-modal"
import { ZapierIntegrationModal } from "./zapier-integration-modal"
import { TeamManagementModal } from "./team-management-modal"
import { ApiKeysModal } from "./api-keys-modal"
import { PaywallOverlay } from "../paywall-overlay"

import type { User } from "../../types"

interface Integration {
  id: string
  name: string
  type: string
  icon: React.ReactNode
  description: string
  status: "connected" | "disconnected" | "error"
  isConfigured: boolean
  isPro?: boolean
  isEnterprise?: boolean
  connectedAt?: string
  lastUsed?: string
  usageCount?: number
  config?: any
}

interface IntegrationsPageProps {
  user: User
  onUpgrade: () => void
}

const availableIntegrations: Integration[] = [
  {
    id: "slack",
    name: "Slack",
    type: "messaging",
    icon: <MessageSquare className="h-6 w-6 text-green-400" />,
    description: "Get alerts in #dev-alerts channel",
    status: "connected",
    isConfigured: true,
    connectedAt: "2024-01-15",
    lastUsed: "2 hours ago",
    usageCount: 47,
    config: {
      channel: "#dev-alerts",
      workspace: "APIWatch Team",
    },
  },
  {
    id: "discord",
    name: "Discord",
    type: "messaging",
    icon: <MessageSquare className="h-6 w-6 text-indigo-400" />,
    description: "Bot notifications with role mentions",
    status: "disconnected",
    isConfigured: false,
    isPro: true,
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    type: "messaging",
    icon: <Users className="h-6 w-6 text-blue-400" />,
    description: "Channel notifications",
    status: "disconnected",
    isConfigured: false,
    isPro: true,
  },
  {
    id: "email",
    name: "Email",
    type: "email",
    icon: <Mail className="h-6 w-6 text-gray-400" />,
    description: "Digest and instant alerts",
    status: "connected",
    isConfigured: true,
    connectedAt: "2024-01-10",
    lastUsed: "1 hour ago",
    usageCount: 156,
    config: {
      frequency: "instant",
      digest: true,
    },
  },
  {
    id: "webhook",
    name: "Custom Webhook",
    type: "webhook",
    icon: <Webhook className="h-6 w-6 text-purple-400" />,
    description: "Custom HTTP endpoints",
    status: "error",
    isConfigured: true,
    isPro: true,
    connectedAt: "2024-01-12",
    lastUsed: "Failed 3 hours ago",
    usageCount: 23,
    config: {
      url: "https://api.example.com/webhooks/apiwatch",
      method: "POST",
    },
  },
  {
    id: "zapier",
    name: "Zapier",
    type: "automation",
    icon: <Zap className="h-6 w-6 text-orange-400" />,
    description: "Connect to 3000+ apps",
    status: "disconnected",
    isConfigured: false,
    isEnterprise: true,
  },
]

const webhookLogs = [
  {
    id: "1",
    integration: "Custom Webhook",
    timestamp: "2024-01-17 14:30:25",
    status: "success",
    statusCode: 200,
    responseTime: "245ms",
    payload: { api: "GitHub API", change: "Deprecation Notice", severity: "critical" },
  },
  {
    id: "2",
    integration: "Slack",
    timestamp: "2024-01-17 14:25:12",
    status: "success",
    statusCode: 200,
    responseTime: "156ms",
    payload: { api: "Stripe API", change: "Rate Limit Update", severity: "medium" },
  },
  {
    id: "3",
    integration: "Custom Webhook",
    timestamp: "2024-01-17 14:20:08",
    status: "failed",
    statusCode: 500,
    responseTime: "timeout",
    payload: { api: "Twilio API", change: "Version Update", severity: "low" },
    error: "Connection timeout after 30s",
  },
  {
    id: "4",
    integration: "Email",
    timestamp: "2024-01-17 14:15:33",
    status: "success",
    statusCode: 200,
    responseTime: "89ms",
    payload: { api: "OpenAI API", change: "New Feature", severity: "info" },
  },
]

const apiKeys = [
  {
    id: "ak_1",
    name: "Production Webhook",
    key: "ak_live_1234567890abcdef",
    created: "2024-01-10",
    lastUsed: "2 hours ago",
    requests: 1247,
    rateLimit: "1000/hour",
    status: "active",
  },
  {
    id: "ak_2",
    name: "Development Testing",
    key: "ak_test_abcdef1234567890",
    created: "2024-01-15",
    lastUsed: "1 day ago",
    requests: 89,
    rateLimit: "100/hour",
    status: "active",
  },
  {
    id: "ak_3",
    name: "Legacy Integration",
    key: "ak_live_fedcba0987654321",
    created: "2023-12-01",
    lastUsed: "Never",
    requests: 0,
    rateLimit: "500/hour",
    status: "inactive",
  },
]

export function IntegrationsPage({ user, onUpgrade }: IntegrationsPageProps) {
  const [selectedIntegration, setSelectedIntegration] = React.useState<Integration | null>(null)
  const [showIntegrationModal, setShowIntegrationModal] = React.useState(false)
  const [showTeamModal, setShowTeamModal] = React.useState(false)
  const [showApiKeysModal, setShowApiKeysModal] = React.useState(false)
  const [integrations, setIntegrations] = React.useState(availableIntegrations)
  const { toast } = useToast()

  const handleIntegrationClick = (integration: Integration) => {
    if ((integration.isPro && user.plan === "free") || (integration.isEnterprise && user.plan !== "enterprise")) {
      onUpgrade()
      return
    }

    setSelectedIntegration(integration)
    setShowIntegrationModal(true)
  }

  const handleIntegrationUpdate = (updatedIntegration: Integration) => {
    setIntegrations((prev) => prev.map((int) => (int.id === updatedIntegration.id ? updatedIntegration : int)))
    toast({
      title: "Integration updated",
      description: `${updatedIntegration.name} has been configured successfully.`,
    })
  }

  const handleDisconnect = (integrationId: string) => {
    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === integrationId ? { ...int, status: "disconnected" as const, isConfigured: false } : int,
      ),
    )
    toast({
      title: "Integration disconnected",
      description: "The integration has been removed from your account.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-900/20 text-green-400 border-green-500/20"
      case "error":
        return "bg-red-900/20 text-red-400 border-red-500/20"
      case "disconnected":
        return "bg-gray-900/20 text-gray-400 border-gray-500/20"
      default:
        return "bg-gray-900/20 text-gray-400 border-gray-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <Check className="h-4 w-4" />
      case "error":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Plus className="h-4 w-4" />
    }
  }

  const connectedIntegrations = integrations.filter((int) => int.status === "connected")
  const totalUsage = connectedIntegrations.reduce((sum, int) => sum + (int.usageCount || 0), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Integrations</h1>
          <p className="text-gray-400">Connect APIWatch with your favorite tools and services</p>
        </div>
        <div className="flex items-center gap-2">
          {user.plan === "enterprise" && (
            <Button
              onClick={() => setShowTeamModal(true)}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Users className="h-4 w-4 mr-2" />
              Manage Team
            </Button>
          )}
          <Button
            onClick={() => setShowApiKeysModal(true)}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <Key className="h-4 w-4 mr-2" />
            API Keys
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Connected</p>
                <p className="text-2xl font-bold text-white">{connectedIntegrations.length}</p>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Notifications</p>
                <p className="text-2xl font-bold text-white">{totalUsage}</p>
              </div>
              <Bell className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Success Rate</p>
                <p className="text-2xl font-bold text-white">96.7%</p>
              </div>
              <Activity className="h-6 w-6 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Response</p>
                <p className="text-2xl font-bold text-white">187ms</p>
              </div>
              <Clock className="h-6 w-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="integrations" className="w-full">
        <TabsList className="grid grid-cols-3 bg-gray-700 mb-6">
          <TabsTrigger value="integrations" className="data-[state=active]:bg-gray-600">
            Available Integrations
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="data-[state=active]:bg-gray-600">
            Webhook Logs
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-gray-600">
            Notification Settings
          </TabsTrigger>
        </TabsList>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration) => (
              <Card
                key={integration.id}
                className={`bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors cursor-pointer relative ${
                  integration.status === "connected" ? "ring-1 ring-green-500/20" : ""
                }`}
                onClick={() => handleIntegrationClick(integration)}
              >
                {((integration.isPro && user.plan === "free") ||
                  (integration.isEnterprise && user.plan !== "enterprise")) && (
                  <div className="absolute top-2 right-2 z-10">
                    <Badge
                      className={
                        integration.isEnterprise
                          ? "bg-purple-900/20 text-purple-400 border-purple-500/20"
                          : "bg-yellow-900/20 text-yellow-400 border-yellow-500/20"
                      }
                    >
                      {integration.isEnterprise ? "Enterprise" : "Pro"}
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {integration.icon}
                      <div>
                        <CardTitle className="text-white text-lg">{integration.name}</CardTitle>
                        <CardDescription className="text-gray-400 text-sm">{integration.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(integration.status)}>
                      {getStatusIcon(integration.status)}
                      <span className="ml-1 capitalize">{integration.status}</span>
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  {integration.isConfigured && integration.config && (
                    <div className="space-y-2 mb-4">
                      {integration.id === "slack" && (
                        <div className="text-sm text-gray-400">
                          Channel: <span className="text-white">{integration.config.channel}</span>
                        </div>
                      )}
                      {integration.id === "email" && (
                        <div className="text-sm text-gray-400">
                          Mode: <span className="text-white capitalize">{integration.config.frequency}</span>
                        </div>
                      )}
                      {integration.id === "webhook" && (
                        <div className="text-sm text-gray-400">
                          Endpoint: <span className="text-white font-mono text-xs">{integration.config.url}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {integration.isConfigured && (
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Connected {integration.connectedAt}</span>
                      <span>{integration.usageCount} notifications</span>
                    </div>
                  )}

                  {!integration.isConfigured && (
                    <div className="flex items-center justify-center py-4">
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={
                          (integration.isPro && user.plan === "free") ||
                          (integration.isEnterprise && user.plan !== "enterprise")
                        }
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Webhook Logs Tab */}
        <TabsContent value="webhooks" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Webhook Delivery Logs</CardTitle>
              <CardDescription className="text-gray-400">
                Monitor the status and performance of your webhook deliveries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-700 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700 hover:bg-gray-700/50">
                      <TableHead className="text-gray-300">Integration</TableHead>
                      <TableHead className="text-gray-300">Timestamp</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Response Time</TableHead>
                      <TableHead className="text-gray-300">Payload</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {webhookLogs.map((log) => (
                      <TableRow key={log.id} className="border-gray-700 hover:bg-gray-700/30">
                        <TableCell className="text-white font-medium">{log.integration}</TableCell>
                        <TableCell className="text-gray-300 font-mono text-sm">{log.timestamp}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              log.status === "success"
                                ? "bg-green-900/20 text-green-400 border-green-500/20"
                                : "bg-red-900/20 text-red-400 border-red-500/20"
                            }
                          >
                            {log.status === "success" ? (
                              <Check className="h-3 w-3 mr-1" />
                            ) : (
                              <AlertCircle className="h-3 w-3 mr-1" />
                            )}
                            {log.statusCode}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">{log.responseTime}</TableCell>
                        <TableCell className="text-gray-300">
                          <code className="text-xs bg-gray-700 px-2 py-1 rounded">
                            {log.payload.api} - {log.payload.change}
                          </code>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Global Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure notification behavior across all integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Enable Notifications</Label>
                    <p className="text-sm text-gray-400">Master switch for all notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Quiet Hours</Label>
                    <p className="text-sm text-gray-400">Pause notifications during off-hours</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Digest Mode</Label>
                    <p className="text-sm text-gray-400">Bundle notifications into daily digest</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Critical Only</Label>
                    <p className="text-sm text-gray-400">Only send critical severity alerts</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 relative">
              {user.plan === "free" && (
                <PaywallOverlay feature="Advanced notification customization" onUpgrade={onUpgrade} />
              )}
              <CardHeader>
                <CardTitle className="text-white">Message Templates</CardTitle>
                <CardDescription className="text-gray-400">
                  Customize notification messages with variables
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Critical Alert Template</Label>
                  <div className="bg-gray-700 p-3 rounded-lg font-mono text-sm text-gray-300">
                    🚨 CRITICAL: {`{{api_name}}`} - {`{{change_type}}`}
                    <br />
                    Severity: {`{{severity}}`}
                    <br />
                    Action required by: {`{{deadline}}`}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Warning Alert Template</Label>
                  <div className="bg-gray-700 p-3 rounded-lg font-mono text-sm text-gray-300">
                    ⚠️ {`{{api_name}}`} update detected
                    <br />
                    Change: {`{{change_type}}`}
                    <br />
                    Review recommended
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Available Variables</Label>
                  <div className="flex flex-wrap gap-2">
                    {["{{api_name}}", "{{change_type}}", "{{severity}}", "{{deadline}}", "{{confidence}}"].map(
                      (variable) => (
                        <Badge
                          key={variable}
                          variant="outline"
                          className="border-gray-600 text-gray-300 font-mono text-xs"
                        >
                          {variable}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Integration Modals */}
      {selectedIntegration && (
        <>
          {selectedIntegration.id === "slack" && (
            <SlackIntegrationModal
              isOpen={showIntegrationModal}
              onClose={() => setShowIntegrationModal(false)}
              integration={selectedIntegration}
              onUpdate={handleIntegrationUpdate}
              onDisconnect={handleDisconnect}
            />
          )}
          {selectedIntegration.id === "discord" && (
            <DiscordIntegrationModal
              isOpen={showIntegrationModal}
              onClose={() => setShowIntegrationModal(false)}
              integration={selectedIntegration}
              onUpdate={handleIntegrationUpdate}
              onDisconnect={handleDisconnect}
            />
          )}
          {selectedIntegration.id === "teams" && (
            <TeamsIntegrationModal
              isOpen={showIntegrationModal}
              onClose={() => setShowIntegrationModal(false)}
              integration={selectedIntegration}
              onUpdate={handleIntegrationUpdate}
              onDisconnect={handleDisconnect}
            />
          )}
          {selectedIntegration.id === "webhook" && (
            <WebhookIntegrationModal
              isOpen={showIntegrationModal}
              onClose={() => setShowIntegrationModal(false)}
              integration={selectedIntegration}
              onUpdate={handleIntegrationUpdate}
              onDisconnect={handleDisconnect}
            />
          )}
          {selectedIntegration.id === "email" && (
            <EmailIntegrationModal
              isOpen={showIntegrationModal}
              onClose={() => setShowIntegrationModal(false)}
              integration={selectedIntegration}
              onUpdate={handleIntegrationUpdate}
              onDisconnect={handleDisconnect}
            />
          )}
          {selectedIntegration.id === "zapier" && (
            <ZapierIntegrationModal
              isOpen={showIntegrationModal}
              onClose={() => setShowIntegrationModal(false)}
              integration={selectedIntegration}
              onUpdate={handleIntegrationUpdate}
              onDisconnect={handleDisconnect}
            />
          )}
        </>
      )}

      <TeamManagementModal isOpen={showTeamModal} onClose={() => setShowTeamModal(false)} user={user} />

      <ApiKeysModal isOpen={showApiKeysModal} onClose={() => setShowApiKeysModal(false)} apiKeys={apiKeys} />
    </div>
  )
}

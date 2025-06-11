"use client"

import * as React from "react"
import { Check, MessageSquare, RefreshCw, Settings, Trash2, TestTube } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

interface SlackIntegrationModalProps {
  isOpen: boolean
  onClose: () => void
  integration: any
  onUpdate: (integration: any) => void
  onDisconnect: (id: string) => void
}

export function SlackIntegrationModal({
  isOpen,
  onClose,
  integration,
  onUpdate,
  onDisconnect,
}: SlackIntegrationModalProps) {
  const [isConnecting, setIsConnecting] = React.useState(false)
  const [isTesting, setIsTesting] = React.useState(false)
  const [selectedChannel, setSelectedChannel] = React.useState(integration.config?.channel || "#dev-alerts")
  const [selectedWorkspace, setSelectedWorkspace] = React.useState(integration.config?.workspace || "")
  const [notificationSettings, setNotificationSettings] = React.useState({
    critical: true,
    warning: true,
    info: false,
    mentions: true,
    threads: false,
  })
  const { toast } = useToast()

  const workspaces = [
    { id: "ws1", name: "APIWatch Team", channels: ["#dev-alerts", "#general", "#api-monitoring", "#critical-alerts"] },
    { id: "ws2", name: "Development", channels: ["#dev", "#alerts", "#monitoring"] },
  ]

  const handleOAuthConnect = async () => {
    setIsConnecting(true)

    // Simulate OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const updatedIntegration = {
      ...integration,
      status: "connected" as const,
      isConfigured: true,
      connectedAt: new Date().toISOString().split("T")[0],
      config: {
        channel: selectedChannel,
        workspace: selectedWorkspace || "APIWatch Team",
        settings: notificationSettings,
      },
    }

    onUpdate(updatedIntegration)
    setIsConnecting(false)

    toast({
      title: "Slack connected!",
      description: `Notifications will be sent to ${selectedChannel} in ${selectedWorkspace || "APIWatch Team"}.`,
    })
  }

  const handleTestMessage = async () => {
    setIsTesting(true)

    // Simulate test message
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsTesting(false)
    toast({
      title: "Test message sent!",
      description: "Check your Slack channel for the test notification.",
    })
  }

  const handleDisconnect = () => {
    onDisconnect(integration.id)
    onClose()
  }

  const currentWorkspace = workspaces.find((ws) => ws.name === selectedWorkspace) || workspaces[0]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white">Slack Integration</DialogTitle>
              <DialogDescription className="text-gray-400">
                Connect APIWatch to your Slack workspace for real-time notifications
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {!integration.isConfigured ? (
            <>
              {/* OAuth Connection */}
              <div className="space-y-4">
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="font-medium text-white mb-2">Connect to Slack</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Authorize APIWatch to send notifications to your Slack workspace
                  </p>

                  <div className="space-y-3">
                    <div>
                      <Label className="text-white">Workspace</Label>
                      <Select value={selectedWorkspace} onValueChange={setSelectedWorkspace}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select workspace" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          {workspaces.map((workspace) => (
                            <SelectItem key={workspace.id} value={workspace.name}>
                              {workspace.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-white">Channel</Label>
                      <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          {currentWorkspace.channels.map((channel) => (
                            <SelectItem key={channel} value={channel}>
                              {channel}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleOAuthConnect}
                  disabled={isConnecting}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isConnecting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Connecting to Slack...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Connect with Slack
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Connected State */}
              <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="font-medium text-green-400">Connected to Slack</span>
                </div>
                <div className="text-sm text-gray-300">
                  Workspace: <span className="text-white">{integration.config?.workspace}</span>
                  <br />
                  Channel: <span className="text-white">{integration.config?.channel}</span>
                </div>
              </div>

              {/* Configuration */}
              <div className="space-y-4">
                <h3 className="font-medium text-white">Notification Settings</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Critical Alerts</Label>
                      <p className="text-sm text-gray-400">High priority notifications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.critical}
                      onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, critical: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Warning Alerts</Label>
                      <p className="text-sm text-gray-400">Medium priority notifications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.warning}
                      onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, warning: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Info Alerts</Label>
                      <p className="text-sm text-gray-400">Low priority notifications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.info}
                      onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, info: checked }))}
                    />
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">@channel Mentions</Label>
                      <p className="text-sm text-gray-400">Mention channel for critical alerts</p>
                    </div>
                    <Switch
                      checked={notificationSettings.mentions}
                      onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, mentions: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Use Threads</Label>
                      <p className="text-sm text-gray-400">Reply in threads to reduce noise</p>
                    </div>
                    <Switch
                      checked={notificationSettings.threads}
                      onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, threads: checked }))}
                    />
                  </div>
                </div>
              </div>

              {/* Message Preview */}
              <div className="space-y-4">
                <h3 className="font-medium text-white">Message Preview</h3>
                <div className="bg-gray-700/30 rounded-lg p-4 border-l-4 border-red-500">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-xs font-bold text-white">
                      A
                    </div>
                    <span className="font-medium text-white">APIWatch</span>
                    <Badge className="bg-red-900/20 text-red-400 border-red-500/20 text-xs">CRITICAL</Badge>
                    <span className="text-xs text-gray-400">now</span>
                  </div>
                  <div className="text-white">
                    🚨 <strong>GitHub REST API</strong> - Deprecation Notice
                    <br />
                    <span className="text-gray-300">
                      API will be deprecated on March 15, 2024. Migration to GraphQL API v4 recommended.
                    </span>
                    <br />
                    <span className="text-blue-400">Confidence: 96%</span>
                  </div>
                  {notificationSettings.mentions && <div className="mt-2 text-yellow-400">@channel</div>}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={handleTestMessage}
                  disabled={isTesting}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  {isTesting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <TestTube className="h-4 w-4 mr-2" />
                      Send Test Message
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleDisconnect}
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Disconnect
                </Button>

                <Button className="bg-blue-600 hover:bg-blue-700 ml-auto">
                  <Settings className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

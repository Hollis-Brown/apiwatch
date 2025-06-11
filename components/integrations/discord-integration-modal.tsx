"use client"

import * as React from "react"
import { Check, Copy, MessageSquare, RefreshCw, Settings, Trash2, TestTube } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

interface DiscordIntegrationModalProps {
  isOpen: boolean
  onClose: () => void
  integration: any
  onUpdate: (integration: any) => void
  onDisconnect: (id: string) => void
}

export function DiscordIntegrationModal({
  isOpen,
  onClose,
  integration,
  onUpdate,
  onDisconnect,
}: DiscordIntegrationModalProps) {
  const [webhookUrl, setWebhookUrl] = React.useState(integration.config?.webhookUrl || "")
  const [selectedServer, setSelectedServer] = React.useState(integration.config?.server || "")
  const [selectedChannel, setSelectedChannel] = React.useState(integration.config?.channel || "")
  const [isConnecting, setIsConnecting] = React.useState(false)
  const [isTesting, setIsTesting] = React.useState(false)
  const [notificationSettings, setNotificationSettings] = React.useState({
    critical: true,
    warning: true,
    info: false,
    roleMentions: true,
    embeds: true,
  })
  const { toast } = useToast()

  const servers = [
    {
      id: "server1",
      name: "APIWatch Development",
      channels: ["#api-alerts", "#general", "#dev-notifications", "#critical-only"],
    },
    {
      id: "server2",
      name: "Production Monitoring",
      channels: ["#alerts", "#monitoring", "#incidents"],
    },
  ]

  const handleConnect = async () => {
    if (!webhookUrl) {
      toast({
        title: "Webhook URL required",
        description: "Please enter a valid Discord webhook URL.",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)

    // Simulate connection
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const updatedIntegration = {
      ...integration,
      status: "connected" as const,
      isConfigured: true,
      connectedAt: new Date().toISOString().split("T")[0],
      config: {
        webhookUrl,
        server: selectedServer,
        channel: selectedChannel,
        settings: notificationSettings,
      },
    }

    onUpdate(updatedIntegration)
    setIsConnecting(false)

    toast({
      title: "Discord connected!",
      description: `Notifications will be sent to ${selectedChannel || "your Discord channel"}.`,
    })
  }

  const handleTestMessage = async () => {
    setIsTesting(true)

    // Simulate test message
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsTesting(false)
    toast({
      title: "Test message sent!",
      description: "Check your Discord channel for the test notification.",
    })
  }

  const handleDisconnect = () => {
    onDisconnect(integration.id)
    onClose()
  }

  const copyWebhookInstructions = () => {
    navigator.clipboard.writeText(`1. Go to your Discord server settings
2. Click on "Integrations" 
3. Click "Create Webhook"
4. Choose the channel for notifications
5. Copy the webhook URL and paste it below`)

    toast({
      title: "Instructions copied!",
      description: "Webhook setup instructions copied to clipboard.",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white">Discord Integration</DialogTitle>
              <DialogDescription className="text-gray-400">
                Send API monitoring alerts to your Discord server
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {!integration.isConfigured ? (
            <>
              {/* Setup Instructions */}
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-blue-400">Setup Instructions</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyWebhookInstructions}
                    className="text-blue-400 hover:bg-blue-900/20"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                  <li>Go to your Discord server settings</li>
                  <li>Click on "Integrations"</li>
                  <li>Click "Create Webhook"</li>
                  <li>Choose the channel for notifications</li>
                  <li>Copy the webhook URL and paste it below</li>
                </ol>
              </div>

              {/* Webhook Configuration */}
              <div className="space-y-4">
                <div>
                  <Label className="text-white">Discord Webhook URL *</Label>
                  <Input
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://discord.com/api/webhooks/..."
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    This URL will be used to send notifications to your Discord channel
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Server (Optional)</Label>
                    <Select value={selectedServer} onValueChange={setSelectedServer}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select server" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {servers.map((server) => (
                          <SelectItem key={server.id} value={server.name}>
                            {server.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white">Channel (Optional)</Label>
                    <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select channel" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {selectedServer &&
                          servers
                            .find((s) => s.name === selectedServer)
                            ?.channels.map((channel) => (
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
                onClick={handleConnect}
                disabled={isConnecting || !webhookUrl}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                {isConnecting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Connecting to Discord...
                  </>
                ) : (
                  <>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Connect Discord
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              {/* Connected State */}
              <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="font-medium text-green-400">Connected to Discord</span>
                </div>
                <div className="text-sm text-gray-300">
                  {integration.config?.server && (
                    <>
                      Server: <span className="text-white">{integration.config.server}</span>
                      <br />
                    </>
                  )}
                  {integration.config?.channel && (
                    <>
                      Channel: <span className="text-white">{integration.config.channel}</span>
                      <br />
                    </>
                  )}
                  Webhook:{" "}
                  <span className="text-white font-mono text-xs">
                    {integration.config?.webhookUrl?.substring(0, 50)}...
                  </span>
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
                      <Label className="text-white">Role Mentions</Label>
                      <p className="text-sm text-gray-400">Mention @everyone for critical alerts</p>
                    </div>
                    <Switch
                      checked={notificationSettings.roleMentions}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, roleMentions: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Rich Embeds</Label>
                      <p className="text-sm text-gray-400">Use Discord embeds for better formatting</p>
                    </div>
                    <Switch
                      checked={notificationSettings.embeds}
                      onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, embeds: checked }))}
                    />
                  </div>
                </div>
              </div>

              {/* Message Preview */}
              <div className="space-y-4">
                <h3 className="font-medium text-white">Message Preview</h3>
                <div className="bg-gray-700/30 rounded-lg p-4 border-l-4 border-red-500">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                      A
                    </div>
                    <div>
                      <div className="font-medium text-white">APIWatch</div>
                      <div className="text-xs text-gray-400">Today at 2:30 PM</div>
                    </div>
                  </div>

                  {notificationSettings.embeds ? (
                    <div className="bg-red-900/20 border-l-4 border-red-500 p-3 rounded">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-red-900/20 text-red-400 border-red-500/20 text-xs">CRITICAL</Badge>
                        <span className="text-white font-medium">GitHub REST API</span>
                      </div>
                      <div className="text-gray-300 text-sm mb-2">
                        Deprecation Notice - API will be deprecated on March 15, 2024
                      </div>
                      <div className="text-blue-400 text-xs">Confidence: 96%</div>
                    </div>
                  ) : (
                    <div className="text-white">
                      🚨 **CRITICAL** - GitHub REST API
                      <br />
                      Deprecation Notice - API will be deprecated on March 15, 2024
                      <br />
                      Confidence: 96%
                    </div>
                  )}

                  {notificationSettings.roleMentions && <div className="mt-2 text-blue-400">@everyone</div>}
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

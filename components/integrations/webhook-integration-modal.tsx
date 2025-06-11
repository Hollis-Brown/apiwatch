"use client"

import * as React from "react"
import {
  Check,
  Copy,
  RefreshCw,
  Settings,
  Trash2,
  TestTube,
  Plus,
  Minus,
  Code,
  AlertCircle,
  Clock,
  RotateCcw,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface WebhookIntegrationModalProps {
  isOpen: boolean
  onClose: () => void
  integration: any
  onUpdate: (integration: any) => void
  onDisconnect: (id: string) => void
}

export function WebhookIntegrationModal({
  isOpen,
  onClose,
  integration,
  onUpdate,
  onDisconnect,
}: WebhookIntegrationModalProps) {
  const [webhookUrl, setWebhookUrl] = React.useState(integration.config?.url || "")
  const [method, setMethod] = React.useState(integration.config?.method || "POST")
  const [headers, setHeaders] = React.useState(
    integration.config?.headers || [{ key: "Content-Type", value: "application/json" }],
  )
  const [payloadTemplate, setPayloadTemplate] = React.useState(
    integration.config?.payload ||
      `{
  "alert_type": "{{severity}}",
  "api_name": "{{api_name}}",
  "change_type": "{{change_type}}",
  "description": "{{description}}",
  "confidence": {{confidence}},
  "timestamp": "{{timestamp}}",
  "action_required": {{action_required}},
  "deadline": "{{deadline}}"
}`,
  )
  const [retrySettings, setRetrySettings] = React.useState({
    enabled: true,
    maxRetries: 3,
    retryDelay: 5000,
    backoffMultiplier: 2,
  })
  const [isConnecting, setIsConnecting] = React.useState(false)
  const [isTesting, setIsTesting] = React.useState(false)
  const { toast } = useToast()

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }])
  }

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index))
  }

  const updateHeader = (index: number, field: "key" | "value", value: string) => {
    const newHeaders = [...headers]
    newHeaders[index][field] = value
    setHeaders(newHeaders)
  }

  const handleConnect = async () => {
    if (!webhookUrl) {
      toast({
        title: "Webhook URL required",
        description: "Please enter a valid webhook URL.",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)

    // Simulate connection test
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const updatedIntegration = {
      ...integration,
      status: "connected" as const,
      isConfigured: true,
      connectedAt: new Date().toISOString().split("T")[0],
      config: {
        url: webhookUrl,
        method,
        headers,
        payload: payloadTemplate,
        retrySettings,
      },
    }

    onUpdate(updatedIntegration)
    setIsConnecting(false)

    toast({
      title: "Webhook connected!",
      description: "Your webhook endpoint has been configured successfully.",
    })
  }

  const handleTestWebhook = async () => {
    setIsTesting(true)

    // Simulate test webhook
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsTesting(false)
    toast({
      title: "Test webhook sent!",
      description: "Check your endpoint logs for the test payload.",
    })
  }

  const handleDisconnect = () => {
    onDisconnect(integration.id)
    onClose()
  }

  const samplePayload = {
    alert_type: "critical",
    api_name: "GitHub REST API",
    change_type: "Deprecation Notice",
    description: "API will be deprecated on March 15, 2024. Migration to GraphQL API v4 recommended.",
    confidence: 96,
    timestamp: "2024-01-17T14:30:25Z",
    action_required: true,
    deadline: "2024-03-15T00:00:00Z",
  }

  const availableVariables = [
    { name: "{{api_name}}", description: "Name of the API" },
    { name: "{{change_type}}", description: "Type of change detected" },
    { name: "{{severity}}", description: "Alert severity level" },
    { name: "{{description}}", description: "Detailed description" },
    { name: "{{confidence}}", description: "Confidence percentage" },
    { name: "{{timestamp}}", description: "ISO timestamp" },
    { name: "{{action_required}}", description: "Boolean if action needed" },
    { name: "{{deadline}}", description: "Action deadline if applicable" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gray-800 border-gray-700 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <Code className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white">Custom Webhook</DialogTitle>
              <DialogDescription className="text-gray-400">
                Configure custom HTTP endpoints for API monitoring alerts
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="config" className="w-full">
          <TabsList className="grid grid-cols-4 bg-gray-700 mb-6">
            <TabsTrigger value="config" className="data-[state=active]:bg-gray-600">
              Configuration
            </TabsTrigger>
            <TabsTrigger value="payload" className="data-[state=active]:bg-gray-600">
              Payload Builder
            </TabsTrigger>
            <TabsTrigger value="retry" className="data-[state=active]:bg-gray-600">
              Retry Logic
            </TabsTrigger>
            <TabsTrigger value="logs" className="data-[state=active]:bg-gray-600">
              Test & Logs
            </TabsTrigger>
          </TabsList>

          {/* Configuration Tab */}
          <TabsContent value="config" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-white">Webhook URL *</Label>
                <Input
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://api.example.com/webhooks/apiwatch"
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label className="text-white">HTTP Method</Label>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-white">Headers</Label>
                  <Button size="sm" onClick={addHeader} variant="outline" className="border-gray-600 text-gray-300">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Header
                  </Button>
                </div>
                <div className="space-y-2">
                  {headers.map((header, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={header.key}
                        onChange={(e) => updateHeader(index, "key", e.target.value)}
                        placeholder="Header name"
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                      <Input
                        value={header.value}
                        onChange={(e) => updateHeader(index, "value", e.target.value)}
                        placeholder="Header value"
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeHeader(index)}
                        className="text-red-400 hover:bg-red-900/20"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {!integration.isConfigured ? (
              <Button
                onClick={handleConnect}
                disabled={isConnecting || !webhookUrl}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isConnecting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Testing Connection...
                  </>
                ) : (
                  <>
                    <Code className="h-4 w-4 mr-2" />
                    Connect Webhook
                  </>
                )}
              </Button>
            ) : (
              <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="font-medium text-green-400">Webhook Connected</span>
                </div>
                <div className="text-sm text-gray-300">
                  Endpoint: <span className="text-white font-mono">{integration.config?.url}</span>
                  <br />
                  Method: <span className="text-white">{integration.config?.method}</span>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Payload Builder Tab */}
          <TabsContent value="payload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-white">Payload Template</Label>
                  <Textarea
                    value={payloadTemplate}
                    onChange={(e) => setPayloadTemplate(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white font-mono text-sm h-64"
                    placeholder="Enter your JSON payload template..."
                  />
                </div>

                <div>
                  <Label className="text-white">Available Variables</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {availableVariables.map((variable) => (
                      <div
                        key={variable.name}
                        className="bg-gray-700/30 p-2 rounded cursor-pointer hover:bg-gray-700/50 transition-colors"
                        onClick={() => {
                          navigator.clipboard.writeText(variable.name)
                          toast({
                            title: "Variable copied!",
                            description: `${variable.name} copied to clipboard.`,
                          })
                        }}
                      >
                        <div className="font-mono text-sm text-blue-400">{variable.name}</div>
                        <div className="text-xs text-gray-400">{variable.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-white">Preview with Sample Data</Label>
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                    <pre className="text-sm text-gray-300 overflow-auto">{JSON.stringify(samplePayload, null, 2)}</pre>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(payloadTemplate)
                      toast({
                        title: "Template copied!",
                        description: "Payload template copied to clipboard.",
                      })
                    }}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Template
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPayloadTemplate(JSON.stringify(samplePayload, null, 2))}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Use Sample
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Retry Logic Tab */}
          <TabsContent value="retry" className="space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white font-medium">Enable Retry Logic</Label>
                  <p className="text-sm text-gray-400">Automatically retry failed webhook deliveries</p>
                </div>
                <Switch
                  checked={retrySettings.enabled}
                  onCheckedChange={(checked) => setRetrySettings((prev) => ({ ...prev, enabled: checked }))}
                />
              </div>

              {retrySettings.enabled && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Maximum Retries</Label>
                    <Select
                      value={retrySettings.maxRetries.toString()}
                      onValueChange={(value) =>
                        setRetrySettings((prev) => ({ ...prev, maxRetries: Number.parseInt(value) }))
                      }
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="1">1 retry</SelectItem>
                        <SelectItem value="3">3 retries</SelectItem>
                        <SelectItem value="5">5 retries</SelectItem>
                        <SelectItem value="10">10 retries</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white">Initial Retry Delay</Label>
                    <Select
                      value={retrySettings.retryDelay.toString()}
                      onValueChange={(value) =>
                        setRetrySettings((prev) => ({ ...prev, retryDelay: Number.parseInt(value) }))
                      }
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="1000">1 second</SelectItem>
                        <SelectItem value="5000">5 seconds</SelectItem>
                        <SelectItem value="10000">10 seconds</SelectItem>
                        <SelectItem value="30000">30 seconds</SelectItem>
                        <SelectItem value="60000">1 minute</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white">Backoff Multiplier</Label>
                    <Select
                      value={retrySettings.backoffMultiplier.toString()}
                      onValueChange={(value) =>
                        setRetrySettings((prev) => ({ ...prev, backoffMultiplier: Number.parseFloat(value) }))
                      }
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="1">1x (no backoff)</SelectItem>
                        <SelectItem value="1.5">1.5x</SelectItem>
                        <SelectItem value="2">2x (exponential)</SelectItem>
                        <SelectItem value="3">3x</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-blue-400" />
                      <span className="font-medium text-blue-400">Retry Schedule Preview</span>
                    </div>
                    <div className="text-sm text-gray-300 space-y-1">
                      <div>Initial attempt: Immediate</div>
                      {Array.from({ length: retrySettings.maxRetries }, (_, i) => {
                        const delay = retrySettings.retryDelay * Math.pow(retrySettings.backoffMultiplier, i)
                        return (
                          <div key={i}>
                            Retry {i + 1}: After{" "}
                            {delay >= 60000 ? `${(delay / 60000).toFixed(1)}m` : `${delay / 1000}s`}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Test & Logs Tab */}
          <TabsContent value="logs" className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <Button
                  onClick={handleTestWebhook}
                  disabled={isTesting || !integration.isConfigured}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isTesting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Sending Test...
                    </>
                  ) : (
                    <>
                      <TestTube className="h-4 w-4 mr-2" />
                      Send Test Webhook
                    </>
                  )}
                </Button>

                {integration.isConfigured && (
                  <Button
                    onClick={handleDisconnect}
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Disconnect
                  </Button>
                )}
              </div>

              {integration.isConfigured && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Recent Delivery Attempts</Label>
                    <div className="mt-2 space-y-2">
                      <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-400" />
                            <span className="text-red-400 font-medium">Failed</span>
                            <Badge className="bg-red-900/20 text-red-400 border-red-500/20 text-xs">500</Badge>
                          </div>
                          <span className="text-xs text-gray-400">3 hours ago</span>
                        </div>
                        <div className="text-sm text-gray-300">Connection timeout after 30s</div>
                        <div className="text-xs text-gray-400 mt-1">Retry 3/3 - Giving up</div>
                      </div>

                      <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-400" />
                            <span className="text-green-400 font-medium">Success</span>
                            <Badge className="bg-green-900/20 text-green-400 border-green-500/20 text-xs">200</Badge>
                          </div>
                          <span className="text-xs text-gray-400">5 hours ago</span>
                        </div>
                        <div className="text-sm text-gray-300">Delivered in 245ms</div>
                      </div>

                      <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-400" />
                            <span className="text-green-400 font-medium">Success</span>
                            <Badge className="bg-green-900/20 text-green-400 border-green-500/20 text-xs">200</Badge>
                          </div>
                          <span className="text-xs text-gray-400">1 day ago</span>
                        </div>
                        <div className="text-sm text-gray-300">Delivered in 156ms</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {integration.isConfigured && (
          <div className="flex justify-end pt-4 border-t border-gray-700">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Settings className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

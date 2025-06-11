"use client"

import * as React from "react"
import { Check, Mail, RefreshCw, Settings, TestTube } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

interface EmailIntegrationModalProps {
  isOpen: boolean
  onClose: () => void
  integration: any
  onUpdate: (integration: any) => void
  onDisconnect: (id: string) => void
}

export function EmailIntegrationModal({
  isOpen,
  onClose,
  integration,
  onUpdate,
  onDisconnect,
}: EmailIntegrationModalProps) {
  const [frequency, setFrequency] = React.useState(integration.config?.frequency || "instant")
  const [digest, setDigest] = React.useState(integration.config?.digest || true)
  const [isTesting, setIsTesting] = React.useState(false)
  const { toast } = useToast()

  const handleTest = async () => {
    setIsTesting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsTesting(false)
    toast({
      title: "Test email sent!",
      description: "Check your inbox for the test notification.",
    })
  }

  const handleSave = () => {
    const updatedIntegration = {
      ...integration,
      config: { ...integration.config, frequency, digest },
    }
    onUpdate(updatedIntegration)
    toast({
      title: "Email settings updated!",
      description: "Your email notification preferences have been saved.",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white">Email Notifications</DialogTitle>
              <DialogDescription className="text-gray-400">
                Configure email alerts and digest settings
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Check className="h-5 w-5 text-green-400" />
              <span className="font-medium text-green-400">Email notifications enabled</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-white">Notification Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="instant">Instant notifications</SelectItem>
                  <SelectItem value="hourly">Hourly digest</SelectItem>
                  <SelectItem value="daily">Daily digest</SelectItem>
                  <SelectItem value="weekly">Weekly summary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Enable Daily Digest</Label>
                <p className="text-sm text-gray-400">Receive a summary of all alerts at 9:00 AM</p>
              </div>
              <Switch checked={digest} onCheckedChange={setDigest} />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleTest}
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
                  Send Test Email
                </>
              )}
            </Button>

            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 ml-auto">
              <Settings className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

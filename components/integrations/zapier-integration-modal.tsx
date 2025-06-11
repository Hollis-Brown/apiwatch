"use client"

import * as React from "react"
import { ExternalLink, RefreshCw, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface ZapierIntegrationModalProps {
  isOpen: boolean
  onClose: () => void
  integration: any
  onUpdate: (integration: any) => void
  onDisconnect: (id: string) => void
}

export function ZapierIntegrationModal({
  isOpen,
  onClose,
  integration,
  onUpdate,
  onDisconnect,
}: ZapierIntegrationModalProps) {
  const [isConnecting, setIsConnecting] = React.useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate opening Zapier in new tab
    window.open("https://zapier.com/apps/apiwatch/integrations", "_blank")

    setIsConnecting(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white">Zapier Integration</DialogTitle>
              <DialogDescription className="text-gray-400">
                Connect APIWatch to 3000+ apps through Zapier
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-orange-900/20 border border-orange-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-purple-900/20 text-purple-400 border-purple-500/20">Enterprise</Badge>
              <span className="font-medium text-orange-400">Premium Integration</span>
            </div>
            <p className="text-sm text-gray-300">
              Zapier integration is available for Enterprise customers. Connect APIWatch alerts to thousands of apps
              including Google Sheets, Jira, PagerDuty, and more.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-white">Popular Zapier Workflows</h3>
            <div className="space-y-3">
              <div className="bg-gray-700/30 p-3 rounded-lg">
                <div className="font-medium text-white text-sm">Create Jira tickets for critical API changes</div>
                <div className="text-xs text-gray-400">Automatically create tickets when APIs are deprecated</div>
              </div>
              <div className="bg-gray-700/30 p-3 rounded-lg">
                <div className="font-medium text-white text-sm">Log alerts to Google Sheets</div>
                <div className="text-xs text-gray-400">Track all API changes in a spreadsheet</div>
              </div>
              <div className="bg-gray-700/30 p-3 rounded-lg">
                <div className="font-medium text-white text-sm">Send to PagerDuty for on-call alerts</div>
                <div className="text-xs text-gray-400">Escalate critical issues to your on-call team</div>
              </div>
            </div>
          </div>

          <Button onClick={handleConnect} disabled={isConnecting} className="w-full bg-orange-600 hover:bg-orange-700">
            {isConnecting ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Opening Zapier...
              </>
            ) : (
              <>
                <ExternalLink className="h-4 w-4 mr-2" />
                Set up on Zapier
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

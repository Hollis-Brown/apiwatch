"use client"

import * as React from "react"
import { Check, RefreshCw, Settings, Trash2, TestTube, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface TeamsIntegrationModalProps {
  isOpen: boolean
  onClose: () => void
  integration: any
  onUpdate: (integration: any) => void
  onDisconnect: (id: string) => void
}

export function TeamsIntegrationModal({
  isOpen,
  onClose,
  integration,
  onUpdate,
  onDisconnect,
}: TeamsIntegrationModalProps) {
  const [isConnecting, setIsConnecting] = React.useState(false)
  const [isTesting, setIsTesting] = React.useState(false)
  const [selectedTeam, setSelectedTeam] = React.useState(integration.config?.team || "")
  const [selectedChannel, setSelectedChannel] = React.useState(integration.config?.channel || "")
  const { toast } = useToast()

  const teams = [
    { id: "team1", name: "Development Team", channels: ["General", "API Alerts", "Critical Issues"] },
    { id: "team2", name: "Operations", channels: ["Monitoring", "Incidents", "Alerts"] },
  ]

  const handleConnect = async () => {
    setIsConnecting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const updatedIntegration = {
      ...integration,
      status: "connected" as const,
      isConfigured: true,
      connectedAt: new Date().toISOString().split("T")[0],
      config: { team: selectedTeam, channel: selectedChannel },
    }

    onUpdate(updatedIntegration)
    setIsConnecting(false)
    toast({
      title: "Teams connected!",
      description: `Notifications will be sent to ${selectedChannel} in ${selectedTeam}.`,
    })
  }

  const handleTest = async () => {
    setIsTesting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsTesting(false)
    toast({
      title: "Test message sent!",
      description: "Check your Teams channel for the test notification.",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white">Microsoft Teams</DialogTitle>
              <DialogDescription className="text-gray-400">Send notifications to your Teams channels</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {!integration.isConfigured ? (
            <div className="space-y-4">
              <div>
                <Label className="text-white">Team</Label>
                <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.name}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white">Channel</Label>
                <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {selectedTeam &&
                      teams
                        .find((t) => t.name === selectedTeam)
                        ?.channels.map((channel) => (
                          <SelectItem key={channel} value={channel}>
                            {channel}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleConnect}
                disabled={isConnecting || !selectedTeam || !selectedChannel}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isConnecting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Users className="h-4 w-4 mr-2" />
                    Connect to Teams
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="font-medium text-green-400">Connected to Teams</span>
                </div>
                <div className="text-sm text-gray-300">
                  Team: <span className="text-white">{integration.config?.team}</span>
                  <br />
                  Channel: <span className="text-white">{integration.config?.channel}</span>
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
                      Send Test
                    </>
                  )}
                </Button>

                <Button
                  onClick={() => onDisconnect(integration.id)}
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
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

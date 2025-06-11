"use client"

import * as React from "react"
import { Copy, Eye, EyeOff, Key, Plus, RefreshCw, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

interface ApiKeysModalProps {
  isOpen: boolean
  onClose: () => void
  apiKeys: any[]
}

export function ApiKeysModal({ isOpen, onClose, apiKeys }: ApiKeysModalProps) {
  const [showCreateForm, setShowCreateForm] = React.useState(false)
  const [newKeyName, setNewKeyName] = React.useState("")
  const [newKeyRateLimit, setNewKeyRateLimit] = React.useState("1000")
  const [visibleKeys, setVisibleKeys] = React.useState<Set<string>>(new Set())
  const { toast } = useToast()

  const handleCreateKey = () => {
    if (!newKeyName) return

    toast({
      title: "API key created!",
      description: `New API key "${newKeyName}" has been generated.`,
    })
    setNewKeyName("")
    setShowCreateForm(false)
  }

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys)
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId)
    } else {
      newVisible.add(keyId)
    }
    setVisibleKeys(newVisible)
  }

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast({
      title: "API key copied!",
      description: "The API key has been copied to your clipboard.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-900/20 text-green-400 border-green-500/20"
      case "inactive":
        return "bg-gray-900/20 text-gray-400 border-gray-500/20"
      default:
        return "bg-gray-900/20 text-gray-400 border-gray-500/20"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Key className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white">API Keys</DialogTitle>
              <DialogDescription className="text-gray-400">
                Manage API keys for external integrations and webhooks
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Create New Key */}
          {!showCreateForm ? (
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-white">API Keys ({apiKeys.length})</h3>
                <p className="text-sm text-gray-400">Use these keys to authenticate with the APIWatch API</p>
              </div>
              <Button onClick={() => setShowCreateForm(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create New Key
              </Button>
            </div>
          ) : (
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h3 className="font-medium text-white mb-4">Create New API Key</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Key Name</Label>
                  <Input
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="Production Webhook"
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <Label className="text-white">Rate Limit</Label>
                  <Select value={newKeyRateLimit} onValueChange={setNewKeyRateLimit}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="100">100 requests/hour</SelectItem>
                      <SelectItem value="500">500 requests/hour</SelectItem>
                      <SelectItem value="1000">1,000 requests/hour</SelectItem>
                      <SelectItem value="5000">5,000 requests/hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Button onClick={handleCreateKey} className="bg-blue-600 hover:bg-blue-700">
                  Create Key
                </Button>
                <Button
                  onClick={() => setShowCreateForm(false)}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* API Keys Table */}
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-700/50">
                  <TableHead className="text-gray-300">Name</TableHead>
                  <TableHead className="text-gray-300">Key</TableHead>
                  <TableHead className="text-gray-300">Usage</TableHead>
                  <TableHead className="text-gray-300">Rate Limit</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((apiKey) => (
                  <TableRow key={apiKey.id} className="border-gray-700 hover:bg-gray-700/30">
                    <TableCell>
                      <div>
                        <div className="font-medium text-white">{apiKey.name}</div>
                        <div className="text-sm text-gray-400">Created {apiKey.created}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-700 px-2 py-1 rounded text-xs font-mono text-gray-300">
                          {visibleKeys.has(apiKey.id) ? apiKey.key : `${apiKey.key.substring(0, 12)}${"•".repeat(20)}`}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                          className="h-6 w-6 p-0"
                        >
                          {visibleKeys.has(apiKey.id) ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => copyKey(apiKey.key)} className="h-6 w-6 p-0">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-white">{apiKey.requests.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Last used {apiKey.lastUsed}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">{apiKey.rateLimit}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(apiKey.status)}>{apiKey.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-red-400 hover:bg-red-900/20">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Usage Information */}
          <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-medium text-blue-400 mb-2">API Usage Guidelines</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Keep your API keys secure and never share them publicly</li>
              <li>• Use different keys for different environments (dev, staging, prod)</li>
              <li>• Monitor your usage to avoid hitting rate limits</li>
              <li>• Rotate keys regularly for security best practices</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

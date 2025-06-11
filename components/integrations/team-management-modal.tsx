"use client"

import * as React from "react"
import { Plus, Settings, Trash2, Users, Crown, Shield, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

import type { User } from "../../types"

interface TeamManagementModalProps {
  isOpen: boolean
  onClose: () => void
  user: User
}

const teamMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@company.com",
    role: "admin",
    avatar: "/placeholder.svg",
    joinedAt: "2024-01-10",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@company.com",
    role: "member",
    avatar: "/placeholder.svg",
    joinedAt: "2024-01-12",
    lastActive: "1 day ago",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@company.com",
    role: "viewer",
    avatar: "/placeholder.svg",
    joinedAt: "2024-01-15",
    lastActive: "3 days ago",
  },
]

export function TeamManagementModal({ isOpen, onClose, user }: TeamManagementModalProps) {
  const [inviteEmail, setInviteEmail] = React.useState("")
  const [inviteRole, setInviteRole] = React.useState("member")
  const { toast } = useToast()

  const handleInvite = () => {
    if (!inviteEmail) return

    toast({
      title: "Invitation sent!",
      description: `An invitation has been sent to ${inviteEmail}.`,
    })
    setInviteEmail("")
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4 text-yellow-400" />
      case "member":
        return <Shield className="h-4 w-4 text-blue-400" />
      case "viewer":
        return <Eye className="h-4 w-4 text-gray-400" />
      default:
        return null
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-yellow-900/20 text-yellow-400 border-yellow-500/20"
      case "member":
        return "bg-blue-900/20 text-blue-400 border-blue-500/20"
      case "viewer":
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
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white">Team Management</DialogTitle>
              <DialogDescription className="text-gray-400">
                Manage team members and their access to integrations
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invite Section */}
          <div className="bg-gray-700/30 rounded-lg p-4">
            <h3 className="font-medium text-white mb-4">Invite Team Member</h3>
            <div className="flex gap-3">
              <div className="flex-1">
                <Label className="text-white">Email Address</Label>
                <Input
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label className="text-white">Role</Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleInvite} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              </div>
            </div>
          </div>

          {/* Team Members Table */}
          <div>
            <h3 className="font-medium text-white mb-4">Team Members ({teamMembers.length})</h3>
            <div className="border border-gray-700 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-gray-700/50">
                    <TableHead className="text-gray-300">Member</TableHead>
                    <TableHead className="text-gray-300">Role</TableHead>
                    <TableHead className="text-gray-300">Joined</TableHead>
                    <TableHead className="text-gray-300">Last Active</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id} className="border-gray-700 hover:bg-gray-700/30">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
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
                        <Badge className={getRoleBadge(member.role)}>
                          {getRoleIcon(member.role)}
                          <span className="ml-1 capitalize">{member.role}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300">{member.joinedAt}</TableCell>
                      <TableCell className="text-gray-300">{member.lastActive}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Settings className="h-3 w-3" />
                          </Button>
                          {member.role !== "admin" && (
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-red-400 hover:bg-red-900/20">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Role Permissions */}
          <div>
            <h3 className="font-medium text-white mb-4">Role Permissions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="h-4 w-4 text-yellow-400" />
                  <span className="font-medium text-yellow-400">Admin</span>
                </div>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Manage all integrations</li>
                  <li>• Invite/remove team members</li>
                  <li>• Access billing settings</li>
                  <li>• View all API monitoring</li>
                </ul>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <span className="font-medium text-blue-400">Member</span>
                </div>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Configure integrations</li>
                  <li>• Add/remove APIs</li>
                  <li>• View analytics</li>
                  <li>• Receive notifications</li>
                </ul>
              </div>

              <div className="bg-gray-900/20 border border-gray-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-gray-400">Viewer</span>
                </div>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• View API status</li>
                  <li>• Read-only analytics</li>
                  <li>• Receive notifications</li>
                  <li>• No configuration access</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

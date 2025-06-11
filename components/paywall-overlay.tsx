"use client"
import { Crown } from "lucide-react"

import { Button } from "@/components/ui/button"

export function PaywallOverlay({ feature, onUpgrade }: { feature: string; onUpgrade: () => void }) {
  return (
    <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
      <div className="text-center space-y-4 p-6">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
          <Crown className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Upgrade Required</h3>
          <p className="text-gray-300 text-sm mb-4">{feature} is available on Pro and Enterprise plans.</p>
          <Button onClick={onUpgrade} className="bg-blue-600 hover:bg-blue-700">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  )
}

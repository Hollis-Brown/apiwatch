"use client"

export function ApiChangeHeatmap() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-12 gap-1">
          <div className="col-span-2"></div>
          <div className="text-xs text-gray-400 text-center">Jan</div>
          <div className="text-xs text-gray-400 text-center">Feb</div>
          <div className="text-xs text-gray-400 text-center">Mar</div>
          <div className="text-xs text-gray-400 text-center">Apr</div>
          <div className="text-xs text-gray-400 text-center">May</div>
          <div className="text-xs text-gray-400 text-center">Jun</div>
          <div className="text-xs text-gray-400 text-center">Jul</div>
          <div className="text-xs text-gray-400 text-center">Aug</div>
          <div className="text-xs text-gray-400 text-center">Sep</div>
          <div className="text-xs text-gray-400 text-center">Oct</div>
        </div>

        {/* Stripe API */}
        <div className="grid grid-cols-12 gap-1 mt-2">
          <div className="col-span-2 text-xs text-gray-300 flex items-center">Stripe API</div>
          <div className="bg-green-900/30 h-8 rounded-sm"></div>
          <div className="bg-green-900/30 h-8 rounded-sm"></div>
          <div className="bg-green-900/80 h-8 rounded-sm"></div>
          <div className="bg-green-900/30 h-8 rounded-sm"></div>
          <div className="bg-green-900/30 h-8 rounded-sm"></div>
          <div className="bg-green-900/50 h-8 rounded-sm"></div>
          <div className="bg-green-900/30 h-8 rounded-sm"></div>
          <div className="bg-green-900/30 h-8 rounded-sm"></div>
          <div className="bg-green-900/30 h-8 rounded-sm"></div>
          <div className="bg-green-900/30 h-8 rounded-sm"></div>
        </div>

        {/* Twilio API */}
        <div className="grid grid-cols-12 gap-1 mt-2">
          <div className="col-span-2 text-xs text-gray-300 flex items-center">Twilio API</div>
          <div className="bg-yellow-900/30 h-8 rounded-sm"></div>
          <div className="bg-yellow-900/50 h-8 rounded-sm"></div>
          <div className="bg-yellow-900/30 h-8 rounded-sm"></div>
          <div className="bg-yellow-900/80 h-8 rounded-sm"></div>
          <div className="bg-yellow-900/30 h-8 rounded-sm"></div>
          <div className="bg-yellow-900/30 h-8 rounded-sm"></div>
          <div className="bg-yellow-900/50 h-8 rounded-sm"></div>
          <div className="bg-yellow-900/30 h-8 rounded-sm"></div>
          <div className="bg-yellow-900/30 h-8 rounded-sm"></div>
          <div className="bg-yellow-900/30 h-8 rounded-sm"></div>
        </div>

        {/* GitHub API */}
        <div className="grid grid-cols-12 gap-1 mt-2">
          <div className="col-span-2 text-xs text-gray-300 flex items-center">GitHub API</div>
          <div className="bg-red-900/50 h-8 rounded-sm"></div>
          <div className="bg-red-900/30 h-8 rounded-sm"></div>
          <div className="bg-red-900/30 h-8 rounded-sm"></div>
          <div className="bg-red-900/30 h-8 rounded-sm"></div>
          <div className="bg-red-900/80 h-8 rounded-sm"></div>
          <div className="bg-red-900/30 h-8 rounded-sm"></div>
          <div className="bg-red-900/30 h-8 rounded-sm"></div>
          <div className="bg-red-900/50 h-8 rounded-sm"></div>
          <div className="bg-red-900/30 h-8 rounded-sm"></div>
          <div className="bg-red-900/80 h-8 rounded-sm"></div>
        </div>

        {/* OpenAI API */}
        <div className="grid grid-cols-12 gap-1 mt-2">
          <div className="col-span-2 text-xs text-gray-300 flex items-center">OpenAI API</div>
          <div className="bg-blue-900/30 h-8 rounded-sm"></div>
          <div className="bg-blue-900/50 h-8 rounded-sm"></div>
          <div className="bg-blue-900/80 h-8 rounded-sm"></div>
          <div className="bg-blue-900/30 h-8 rounded-sm"></div>
          <div className="bg-blue-900/30 h-8 rounded-sm"></div>
          <div className="bg-blue-900/30 h-8 rounded-sm"></div>
          <div className="bg-blue-900/50 h-8 rounded-sm"></div>
          <div className="bg-blue-900/80 h-8 rounded-sm"></div>
          <div className="bg-blue-900/30 h-8 rounded-sm"></div>
          <div className="bg-blue-900/30 h-8 rounded-sm"></div>
        </div>

        {/* Twitter API */}
        <div className="grid grid-cols-12 gap-1 mt-2">
          <div className="col-span-2 text-xs text-gray-300 flex items-center">Twitter API</div>
          <div className="bg-purple-900/30 h-8 rounded-sm"></div>
          <div className="bg-purple-900/30 h-8 rounded-sm"></div>
          <div className="bg-purple-900/30 h-8 rounded-sm"></div>
          <div className="bg-purple-900/50 h-8 rounded-sm"></div>
          <div className="bg-purple-900/80 h-8 rounded-sm"></div>
          <div className="bg-purple-900/30 h-8 rounded-sm"></div>
          <div className="bg-purple-900/30 h-8 rounded-sm"></div>
          <div className="bg-purple-900/30 h-8 rounded-sm"></div>
          <div className="bg-purple-900/50 h-8 rounded-sm"></div>
          <div className="bg-purple-900/30 h-8 rounded-sm"></div>
        </div>

        <div className="flex items-center justify-center mt-6">
          <div className="flex items-center gap-2">
            <div className="bg-gray-900/30 h-4 w-4 rounded-sm"></div>
            <span className="text-xs text-gray-400">Low</span>
            <div className="bg-gray-900/50 h-4 w-4 rounded-sm ml-2"></div>
            <span className="text-xs text-gray-400">Medium</span>
            <div className="bg-gray-900/80 h-4 w-4 rounded-sm ml-2"></div>
            <span className="text-xs text-gray-400">High</span>
          </div>
        </div>
      </div>
    </div>
  )
}

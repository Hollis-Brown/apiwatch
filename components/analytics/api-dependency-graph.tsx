"use client"

export function ApiDependencyGraph() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 800 300">
        {/* Main node */}
        <g>
          <circle cx="400" cy="150" r="40" fill="#3b82f6" opacity="0.8" />
          <text x="400" y="150" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="12">
            Your App
          </text>
        </g>

        {/* API Nodes */}
        <g>
          {/* Stripe */}
          <circle cx="200" cy="80" r="30" fill="#10b981" opacity="0.8" />
          <text x="200" y="80" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="10">
            Stripe API
          </text>
          <line x1="370" y1="130" x2="225" y2="90" stroke="#6b7280" strokeWidth="2" opacity="0.6" />

          {/* Twilio */}
          <circle cx="150" cy="200" r="30" fill="#f59e0b" opacity="0.8" />
          <text x="150" y="200" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="10">
            Twilio API
          </text>
          <line x1="370" y1="170" x2="175" y2="190" stroke="#6b7280" strokeWidth="2" opacity="0.6" />

          {/* GitHub */}
          <circle cx="600" cy="80" r="30" fill="#ef4444" opacity="0.8" />
          <text x="600" y="80" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="10">
            GitHub API
          </text>
          <line x1="430" y1="130" x2="575" y2="90" stroke="#6b7280" strokeWidth="2" opacity="0.6" />

          {/* OpenAI */}
          <circle cx="650" cy="200" r="30" fill="#8b5cf6" opacity="0.8" />
          <text x="650" y="200" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="10">
            OpenAI API
          </text>
          <line x1="430" y1="170" x2="625" y2="190" stroke="#6b7280" strokeWidth="2" opacity="0.6" />

          {/* Twitter */}
          <circle cx="400" cy="250" r="30" fill="#ec4899" opacity="0.8" />
          <text x="400" y="250" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="10">
            Twitter API
          </text>
          <line x1="400" y1="190" x2="400" y2="220" stroke="#6b7280" strokeWidth="2" opacity="0.6" />
        </g>

        {/* Secondary connections */}
        <line x1="175" y1="190" x2="225" y2="90" stroke="#6b7280" strokeWidth="1" opacity="0.3" strokeDasharray="5,5" />
        <line x1="625" y1="190" x2="575" y2="90" stroke="#6b7280" strokeWidth="1" opacity="0.3" strokeDasharray="5,5" />
      </svg>
    </div>
  )
}

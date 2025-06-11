"use client"

import * as React from "react"
import {
  MessageSquare,
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  Code,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Copy,
  Check,
  Minimize2,
  Maximize2,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

// Types
type MessageType = "user" | "assistant"
type MessageCategory = "question" | "code" | "recommendation" | "warning" | "success"

type ChatMessage = {
  id: string
  type: MessageType
  content: string
  category?: MessageCategory
  timestamp: Date
  code?: {
    language: string
    content: string
  }
  suggestions?: string[]
}

// Sample conversation data
const sampleMessages: ChatMessage[] = [
  {
    id: "1",
    type: "assistant",
    content:
      "Hi! I'm your API assistant. I can help you with API integrations, monitoring, and troubleshooting. What would you like to know?",
    category: "question",
    timestamp: new Date(Date.now() - 300000),
    suggestions: [
      "Which APIs are most at risk of deprecation?",
      "Help me migrate from Twitter API v1 to v2",
      "Show me payment APIs that support webhooks",
      "What APIs changed this week?",
    ],
  },
]

// Code Block Component
function CodeBlock({ language, content }: { language: string; content: string }) {
  const [copied, setCopied] = React.useState(false)
  const { toast } = useToast()

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Code copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative mt-2">
      <div className="flex items-center justify-between bg-gray-900 px-3 py-2 rounded-t-lg">
        <span className="text-xs text-gray-400">{language}</span>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="h-6 w-6 p-0">
          {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3 text-gray-400" />}
        </Button>
      </div>
      <pre className="bg-gray-900 p-3 rounded-b-lg overflow-x-auto text-xs text-gray-300 font-mono">{content}</pre>
    </div>
  )
}

// Message Component
function ChatMessageComponent({ message }: { message: ChatMessage }) {
  const isUser = message.type === "user"

  const getCategoryIcon = (category?: MessageCategory) => {
    switch (category) {
      case "code":
        return <Code className="h-4 w-4 text-blue-400" />
      case "recommendation":
        return <Lightbulb className="h-4 w-4 text-yellow-400" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-400" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      default:
        return null
    }
  }

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <Avatar className="h-8 w-8 flex-shrink-0">
        {isUser ? (
          <>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-blue-600">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </>
        ) : (
          <AvatarFallback className="bg-purple-600">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        )}
      </Avatar>
      <div className={`flex-1 max-w-[80%] ${isUser ? "text-right" : ""}`}>
        <div
          className={`inline-block p-3 rounded-lg ${isUser ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-100"}`}
        >
          {message.category && !isUser && (
            <div className="flex items-center gap-2 mb-2">
              {getCategoryIcon(message.category)}
              <span className="text-xs text-gray-400 capitalize">{message.category}</span>
            </div>
          )}
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          {message.code && <CodeBlock language={message.code.language} content={message.code.content} />}
        </div>
        {message.suggestions && (
          <div className="mt-2 space-y-1">
            {message.suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="block text-left border-gray-600 text-gray-300 hover:bg-gray-700 text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}
        <div className="text-xs text-gray-400 mt-1">{message.timestamp.toLocaleTimeString()}</div>
      </div>
    </div>
  )
}

// AI Assistant Component
export function AiAssistant() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isMinimized, setIsMinimized] = React.useState(false)
  const [messages, setMessages] = React.useState<ChatMessage[]>(sampleMessages)
  const [inputValue, setInputValue] = React.useState("")
  const [isListening, setIsListening] = React.useState(false)
  const [isTyping, setIsTyping] = React.useState(false)
  const { toast } = useToast()

  const scrollAreaRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages are added
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAiResponse(inputValue)
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAiResponse = (userInput: string): ChatMessage => {
    const input = userInput.toLowerCase()

    if (input.includes("deprecation") || input.includes("deprecated")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content:
          "Based on current monitoring data, here are the APIs most at risk of deprecation:\n\n1. **Twitter API v1.1** - Already deprecated, migrate to v2\n2. **Facebook Graph API v15** - Will be deprecated in June 2024\n3. **Google+ API** - Fully deprecated\n\nI recommend setting up deprecation alerts for your critical APIs. Would you like me to help you create a migration plan?",
        category: "warning",
        timestamp: new Date(),
        suggestions: ["Create migration plan for Twitter API", "Set up deprecation alerts", "Show me alternative APIs"],
      }
    }

    if (input.includes("payment") && input.includes("webhook")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content:
          "Here are the top payment APIs that support webhooks:\n\n1. **Stripe** - Excellent webhook reliability (99.9% delivery)\n2. **PayPal** - Good webhook support with retry logic\n3. **Square** - Real-time webhooks for payments\n4. **Braintree** - Comprehensive webhook events\n\nStripe has the best webhook implementation with automatic retries and detailed logging.",
        category: "recommendation",
        timestamp: new Date(),
        code: {
          language: "javascript",
          content: `// Stripe webhook verification
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log('Webhook signature verification failed.', err.message);
    return res.status(400).send('Webhook Error: ' + err.message);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!');
      break;
    default:
      console.log('Unhandled event type ' + event.type);
  }

  res.json({received: true});
});`,
        },
        suggestions: [
          "Show me Stripe integration guide",
          "Compare payment API reliability",
          "Help with webhook testing",
        ],
      }
    }

    if (input.includes("migration") || input.includes("migrate")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content:
          "I'll help you migrate from Twitter API v1.1 to v2. Here's a step-by-step plan:\n\n**Phase 1: Preparation**\n- Audit current v1.1 endpoints usage\n- Review v2 equivalent endpoints\n- Update authentication to Bearer tokens\n\n**Phase 2: Implementation**\n- Update endpoint URLs\n- Modify request/response handling\n- Test with v2 sandbox\n\n**Phase 3: Deployment**\n- Gradual rollout with monitoring\n- Fallback plan to v1.1 if needed",
        category: "code",
        timestamp: new Date(),
        code: {
          language: "javascript",
          content: `// Twitter API v2 user lookup
const response = await fetch('https://api.twitter.com/2/users/by/username/twitterdev', {
  headers: {
    'Authorization': 'Bearer ' + process.env.TWITTER_BEARER_TOKEN,
    'User-Agent': 'v2UserLookupJS'
  }
});

const data = await response.json();
console.log(data);

// Response format (v2)
{
  "data": {
    "id": "2244994945",
    "name": "Twitter Dev",
    "username": "TwitterDev"
  }
}`,
        },
        suggestions: ["Show me v1.1 vs v2 comparison", "Help with authentication setup", "Create testing checklist"],
      }
    }

    if (input.includes("changed") || input.includes("updates")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content:
          "Here are the API changes detected this week:\n\n**🔴 Breaking Changes:**\n- Shopify Admin API: Rate limit reduced from 40 to 20 calls/second\n\n**🟡 Deprecations:**\n- GitHub API: Legacy team endpoints deprecated\n\n**🟢 New Features:**\n- OpenAI API: New GPT-4 Turbo model available\n- Stripe API: Enhanced fraud detection parameters\n\n**📊 Performance Changes:**\n- AWS S3: Improved upload speeds in EU regions",
        category: "warning",
        timestamp: new Date(),
        suggestions: ["Show detailed Shopify changes", "Set up change notifications", "Review my affected APIs"],
      }
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: "assistant",
      content:
        "I can help you with:\n\n• **API Monitoring** - Track uptime, performance, and changes\n• **Integration Help** - Code examples and best practices\n• **Troubleshooting** - Debug API issues and errors\n• **Recommendations** - Find the best APIs for your needs\n• **Migration Planning** - Smooth transitions between API versions\n\nWhat specific challenge are you facing?",
      category: "question",
      timestamp: new Date(),
      suggestions: [
        "Show me trending APIs",
        "Help with API authentication",
        "Find alternatives to my current APIs",
        "Explain webhook best practices",
      ],
    }
  }

  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false)
      toast({
        title: "Voice input stopped",
        description: "Processing your voice input...",
      })
      // Simulate voice processing
      setTimeout(() => {
        setInputValue("Which payment APIs support webhooks?")
      }, 1000)
    } else {
      setIsListening(true)
      toast({
        title: "Listening...",
        description: "Speak your question now",
      })
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg z-50"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card
      className={`fixed bottom-6 right-6 bg-gray-800 border-gray-700 shadow-xl z-50 transition-all duration-300 ${
        isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-400" />
            AI Assistant
            {isTyping && (
              <Badge className="bg-purple-900/20 text-purple-400 border-purple-500/20 text-xs">Typing...</Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-white"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="flex flex-col h-[calc(100%-80px)] p-4">
          {/* Messages */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessageComponent key={message.id} message={message} />
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-purple-600">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="mt-4 space-y-2">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me about APIs, integrations, or monitoring..."
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 resize-none min-h-[40px] max-h-[120px] pr-10"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleVoiceInput}
                  className={`absolute right-2 top-2 h-6 w-6 p-0 ${
                    isListening ? "text-red-400" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-purple-600 hover:bg-purple-700 h-10 w-10 p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-gray-400 text-center">Press Enter to send, Shift+Enter for new line</div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

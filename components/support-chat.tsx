"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  text: string
  sender: "bot" | "user"
  timestamp: Date
}

interface SupportChatProps {
  open: boolean
  onClose: () => void
}

const quickReplies = [
  "How to rent?",
  "Payment options",
  "Deposit rules",
  "Item damage policy",
  "Contact seller",
]

const botResponses: Record<string, string> = {
  "how to rent": "Renting on Fluxera is easy! Browse the marketplace, find an item you need, and click 'Request Item'. The owner gets notified and can accept your request. You then arrange a pickup location on campus. Pay the rental fee + security deposit and enjoy!",
  rent: "Renting on Fluxera is easy! Browse the marketplace, find an item you need, and click 'Request Item'. The owner gets notified and can accept your request. You then arrange a pickup location on campus. Pay the rental fee + security deposit and enjoy!",
  "payment options":
    "We support multiple payment methods: UPI (GPay, PhonePe, Paytm), debit/credit cards, net banking, and on-campus cash payments by mutual agreement between renter and owner.",
  payment:
    "We support multiple payment methods: UPI (GPay, PhonePe, Paytm), debit/credit cards, net banking, and on-campus cash payments by mutual agreement between renter and owner.",
  "deposit rules":
    "Security deposits are set by item owners and displayed on each listing. The deposit is refundable when you return the item in its original condition. Refund is processed within 24-48 hours after return confirmation.",
  deposit:
    "Security deposits are set by item owners and displayed on each listing. The deposit is refundable when you return the item in its original condition. Refund is processed within 24-48 hours after return confirmation.",
  "item damage policy":
    "If an item is damaged during your rental, the security deposit may be used for repairs. We recommend taking photos before and after pickup. For major disputes, our support team mediates between both parties.",
  damage:
    "If an item is damaged during your rental, the security deposit may be used for repairs. We recommend taking photos before and after pickup. For major disputes, our support team mediates between both parties.",
  "contact seller":
    "You can chat with any seller using the 'Chat with Owner' button on their item listing. All messages stay within the app for your safety. If a seller is unresponsive, you can report them through our Help menu.",
  seller:
    "You can chat with any seller using the 'Chat with Owner' button on their item listing. All messages stay within the app for your safety. If a seller is unresponsive, you can report them through our Help menu.",
  contact:
    "You can reach our support team at support@fluxera.in. For quick help, use this chat bot or browse our Help & Support menu. We typically respond to emails within 24 hours.",
  help: "I can help you with: renting items, payment methods, security deposits, damage policies, and contacting sellers. Just ask me anything or tap one of the quick reply buttons!",
  hello:
    "Hello! Welcome to Fluxera Support. I can help you with renting items, payments, deposits, and more. What would you like to know?",
  hi: "Hi there! Welcome to Fluxera Support. How can I help you today? You can ask about renting, payments, deposits, or anything else.",
  refund:
    "Refunds for cancelled rentals are processed within 3-5 business days. Security deposits are refunded within 24-48 hours after item return. For disputes, contact support@fluxera.in.",
  cancel:
    "You can cancel a rental request before the owner accepts it at no charge. After acceptance, cancellation terms depend on the owner's policy. Check the listing details for specifics.",
  safety:
    "For your safety: always meet in public campus areas, verify items before accepting, use in-app messaging only, never share personal financial details outside the app, and report any suspicious activity immediately.",
  list: "To list an item, click 'List an Item' in the navbar. Add photos, set a daily rental price and security deposit, describe your item, and choose a pickup location. Your listing goes live after a quick review!",
}

function getBotResponse(input: string): string {
  const lower = input.toLowerCase().trim()

  for (const [key, response] of Object.entries(botResponses)) {
    if (lower.includes(key)) {
      return response
    }
  }

  return "I'm not sure about that. You can try asking about: renting items, payment options, security deposits, item damage policy, or contacting sellers. For complex issues, email us at support@fluxera.in."
}

export function SupportChat({ open, onClose }: SupportChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi! I'm the Fluxera support assistant. I can help you with renting, payments, deposits, and more. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")

    // Bot responds after a short delay
    setTimeout(() => {
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        text: getBotResponse(text),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
    }, 600)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  if (!open) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col w-[360px] max-h-[520px] rounded-2xl border border-border bg-card shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300 sm:bottom-6 sm:right-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-primary px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary-foreground">Fluxera Support</p>
            <p className="text-[11px] text-primary-foreground/70">Usually replies instantly</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-full text-primary-foreground/70 transition-colors hover:bg-primary-foreground/20 hover:text-primary-foreground"
          aria-label="Close chat"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 min-h-0">
        <div ref={scrollRef} className="flex flex-col gap-3 p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                msg.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  msg.sender === "bot"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {msg.sender === "bot" ? (
                  <Bot className="h-3 w-3" />
                ) : (
                  <User className="h-3 w-3" />
                )}
              </div>
              <div
                className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.sender === "bot"
                    ? "rounded-bl-md bg-muted text-foreground"
                    : "rounded-br-md bg-primary text-primary-foreground"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Quick Replies */}
      <div className="flex gap-1.5 overflow-x-auto px-4 py-2 scrollbar-none border-t border-border bg-muted/30">
        {quickReplies.map((reply) => (
          <button
            key={reply}
            onClick={() => sendMessage(reply)}
            className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-border bg-card px-4 py-3"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border-border bg-muted/50 text-sm"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim()}
          className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  )
}

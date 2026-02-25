"use client"

import { useState, useRef, useEffect } from "react"
import {
  X,
  Send,
  BadgeCheck,
  Phone,
  MoreHorizontal,
  ImageIcon,
  Paperclip,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { RentalItem } from "@/lib/data"

interface ChatMessage {
  id: string
  text: string
  sender: "you" | "owner"
  timestamp: Date
}

interface OwnerChatProps {
  item: RentalItem | null
  open: boolean
  onClose: () => void
}

const autoReplies: Record<string, string> = {
  hi: "Hey! Thanks for your interest in the item. How can I help you?",
  hello: "Hello! What would you like to know about this item?",
  available:
    "Yes, it's still available! When would you like to rent it?",
  price: "The price is as listed. I can offer a small discount for rentals of 3+ days.",
  condition:
    "The item is in great condition. I've taken good care of it. Happy to share more photos if needed.",
  pickup: "I'm usually available for pickup in the evenings after 5 PM or on weekends. What works for you?",
  deposit:
    "The security deposit is refundable once you return the item in the same condition. I'll process it within 24 hours.",
  negotiate: "I'm a bit flexible on the price for longer rentals. What duration are you looking at?",
  photos: "Sure! I can share additional photos. Give me a moment.",
  damage: "Don't worry, minor wear is expected. I only deduct from the deposit for significant damage.",
}

function getOwnerReply(input: string): string {
  const lower = input.toLowerCase().trim()
  for (const [key, response] of Object.entries(autoReplies)) {
    if (lower.includes(key)) {
      return response
    }
  }
  return "Thanks for your message! I'll get back to you shortly. Feel free to ask anything about the item."
}

const quickMessages = [
  "Is this still available?",
  "Can I pick up today?",
  "What's the condition?",
  "Can you negotiate?",
]

export function OwnerChat({ item, open, onClose }: OwnerChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && item) {
      setMessages([
        {
          id: "system-1",
          text: `Hi! I saw your listing for "${item.name}". I'm interested in renting it.`,
          sender: "you",
          timestamp: new Date(),
        },
        {
          id: "system-2",
          text: `Hey! Thanks for reaching out. Yes, the ${item.name} is ${item.availability === "Available" ? "still available" : "currently rented out"}. What would you like to know?`,
          sender: "owner",
          timestamp: new Date(),
        },
      ])
    }
  }, [open, item])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 400)
    }
  }, [open])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: "you",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const ownerMsg: ChatMessage = {
        id: `owner-${Date.now()}`,
        text: getOwnerReply(text),
        sender: "owner",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, ownerMsg])
    }, 800 + Math.random() * 600)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  if (!open || !item) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-stretch justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Chat Panel */}
      <div className="relative z-10 flex w-full max-w-md flex-col bg-card shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close chat"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
            {item.seller.avatar}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-foreground truncate">
                {item.seller.name}
              </span>
              {item.seller.verified && (
                <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {item.seller.year} &middot; {item.seller.department}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Voice call"
            >
              <Phone className="h-4 w-4" />
            </button>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="More options"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Item Context Bar */}
        <div className="flex items-center gap-3 border-b border-border bg-muted/30 px-4 py-2.5">
          <img
            src={item.images[0]}
            alt={item.name}
            className="h-10 w-10 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">
              {item.name}
            </p>
            <p className="text-xs text-primary font-bold">
              {"₹"}{item.pricePerDay}/day
            </p>
          </div>
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
              item.availability === "Available"
                ? "bg-primary/10 text-primary"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {item.availability}
          </span>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 min-h-0">
          <div ref={scrollRef} className="flex flex-col gap-3 p-4">
            {/* Date marker */}
            <div className="flex items-center justify-center">
              <span className="rounded-full bg-muted px-3 py-1 text-[11px] text-muted-foreground">
                Today
              </span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "you" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.sender === "you"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md bg-muted text-foreground"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="mt-0.5 text-[10px] text-muted-foreground px-1">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start">
                <div className="rounded-2xl rounded-bl-md bg-muted px-3.5 py-2.5">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Messages */}
        <div className="flex gap-1.5 overflow-x-auto border-t border-border bg-muted/20 px-4 py-2 scrollbar-none">
          {quickMessages.map((msg) => (
            <button
              key={msg}
              onClick={() => sendMessage(msg)}
              className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
            >
              {msg}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-border bg-card px-4 py-3"
        >
          <button
            type="button"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Attach file"
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Send image"
          >
            <ImageIcon className="h-4 w-4" />
          </button>
          <Input
            ref={inputRef}
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
    </div>
  )
}

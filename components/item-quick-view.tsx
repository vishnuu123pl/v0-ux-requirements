"use client"

import { useState } from "react"
import {
  BadgeCheck,
  MapPin,
  Shield,
  MessageCircle,
  Send,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Share2,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { OwnerChat } from "@/components/owner-chat"
import type { RentalItem } from "@/lib/data"

interface ItemQuickViewProps {
  item: RentalItem | null
  open: boolean
  onClose: () => void
}

function ImageCarousel({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))

  return (
    <div className="relative overflow-hidden rounded-xl bg-muted">
      <div className="aspect-[4/3] relative">
        <img
          src={images[current]}
          alt={`${name} - Image ${current + 1}`}
          className="h-full w-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm text-card-foreground shadow-sm transition-all hover:bg-card"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm text-card-foreground shadow-sm transition-all hover:bg-card"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === current
                  ? "w-4 bg-primary-foreground"
                  : "w-1.5 bg-primary-foreground/50"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function ItemQuickView({ item, open, onClose }: ItemQuickViewProps) {
  const [saved, setSaved] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  if (!item) return null

  const conditionColor =
    item.condition === "New"
      ? "bg-primary/10 text-primary border-primary/20"
      : item.condition === "Like New"
        ? "bg-secondary text-secondary-foreground border-secondary"
        : "bg-muted text-muted-foreground border-border"

  const availabilityColor =
    item.availability === "Available"
      ? "text-primary"
      : item.availability === "Rented"
        ? "text-destructive"
        : "text-muted-foreground"

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg p-0 border-l border-border"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>{item.name}</SheetTitle>
          <SheetDescription>Quick view for {item.name}</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-5 p-5 pb-28">
            {/* Image Carousel */}
            <ImageCarousel images={item.images} name={item.name} />

            {/* Title & Price */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold leading-tight text-foreground text-balance">
                {item.name}
              </h2>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary">
                  {"₹"}{item.pricePerDay}
                </span>
                <span className="text-sm text-muted-foreground">/ day</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className={conditionColor}>
                  {item.condition}
                </Badge>
                <span className={`text-sm font-medium ${availabilityColor}`}>
                  {item.availability === "Available" ? "Available Now" : item.availability}
                </span>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Description</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>

            <Separator />

            {/* Seller Info */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Seller Info</h3>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {item.seller.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-foreground">
                      {item.seller.name}
                    </span>
                    {item.seller.verified && (
                      <BadgeCheck className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.seller.year} &middot; {item.seller.department}
                  </p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2.5 rounded-xl border border-border bg-muted/30 p-4">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
              <div>
                <h4 className="text-sm font-semibold text-foreground">Pickup Location</h4>
                <p className="text-sm text-muted-foreground mt-0.5">{item.location}</p>
              </div>
            </div>

            {/* Security Deposit */}
            {item.securityDeposit > 0 && (
              <div className="flex items-start gap-2.5 rounded-xl border border-border bg-muted/30 p-4">
                <Shield className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    Security Deposit
                  </h4>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {"₹"}{item.securityDeposit.toLocaleString("en-IN")} (refundable)
                  </p>
                </div>
              </div>
            )}

            {/* Chat with Owner CTA */}
            <button
              onClick={() => setChatOpen(true)}
              className="group flex items-center gap-3 rounded-xl border-2 border-primary/20 bg-primary/5 p-4 text-left transition-all hover:border-primary/40 hover:bg-primary/10"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-foreground">
                  Chat with {item.seller.name.split(" ")[0]}
                </span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Ask about availability, condition, pickup &amp; more
                </p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-primary/60 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </ScrollArea>

        {/* Fixed Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-card p-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSaved(!saved)}
              className={`shrink-0 border-border ${
                saved
                  ? "bg-primary/10 text-primary border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              aria-label={saved ? "Unsave item" : "Save item"}
            >
              <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              aria-label="Share item"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setChatOpen(true)}
              variant="outline"
              className="flex-1 border-primary/30 text-primary hover:bg-primary/5 hover:text-primary font-semibold"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat
            </Button>
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              <Send className="mr-2 h-4 w-4" />
              Request Item
            </Button>
          </div>
        </div>
      </SheetContent>

      {/* Owner Chat Drawer */}
      <OwnerChat item={item} open={chatOpen} onClose={() => setChatOpen(false)} />
    </Sheet>
  )
}
